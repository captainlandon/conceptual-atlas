import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL, fileURLToPath} from 'node:url';
import {createServer} from 'node:http';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const artifact=process.env.ATLAS_TEST_ARTIFACTS;
if(artifact)await fs.mkdir(artifact,{recursive:true});
const server=createServer(async(req,res)=>{try{const p=path.join(dist,new URL(req.url,'http://localhost').pathname==='/'?'index.html':new URL(req.url,'http://localhost').pathname);if(!p.startsWith(dist+path.sep))throw Error('invalid path');res.setHeader('Content-Type','text/html; charset=utf-8');res.end(await fs.readFile(p));}catch{res.statusCode=404;res.end('Not found')}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`;
let browser;
try{
 browser=await chromium.launch({headless:true,...(process.env.ATLAS_BROWSER_EXECUTABLE?{executablePath:process.env.ATLAS_BROWSER_EXECUTABLE}:{}),args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});
 for(const [label,url,offline] of [['web',base+'/',false],['offline',pathToFileURL(path.join(dist,'offline.html')).href,true]]){
  const ctx=await browser.newContext({offline});const page=await ctx.newPage();const errors=[];const network=[];
  page.on('pageerror',error=>errors.push(error.message));page.on('request',req=>{if(/^https?:/.test(req.url())&&!req.url().startsWith(base))network.push(req.url())});
  await page.goto(url);await page.locator('#concepts button').first().waitFor();
  await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').textContent().then(t=>t.trim()),'Skip to atlas');await page.keyboard.press('Enter');assert.equal(await page.locator(':focus').getAttribute('id'),'main');
  assert.equal(await page.locator('.print-only').first().isVisible(),false,'print collection leaked on screen');
  await page.locator('#concepts [data-id="ambiguity-01"]').click();await page.getByRole('heading',{name:'Ambiguity',exact:true}).waitFor();
  await page.getByRole('button',{name:'Compare',exact:true}).click();await page.locator('#other-concept').selectOption('vagueness-01');await page.getByRole('heading',{name:'Vagueness',exact:true}).waitFor();
  await page.getByRole('button',{name:'Context',exact:true}).click();await page.locator('#scenario').selectOption('both');
  await page.getByLabel('Multiple distinct readings?',{exact:true}).check();await page.getByLabel('Borderline application?',{exact:true}).check();assert.equal(await page.locator('input[type=checkbox]:checked').count(),2);
  await page.getByLabel('Multiple distinct readings?',{exact:true}).focus();await page.keyboard.press('Space');assert.equal(await page.locator('input[type=checkbox]:checked').count(),1);
  await page.getByRole('button',{name:'Inspect worked explanation',exact:true}).click();await page.getByRole('region',{name:'Worked explanation'}).waitFor();assert.match(await page.locator('#worked-analysis').innerText(),/occur together/);
  await page.locator('#reflection').fill('Which place do you mean?');await page.locator('#scenario').selectOption('fine');assert.equal(await page.locator('#reflection').inputValue(),'');
  await page.getByRole('button',{name:'Inspect worked explanation',exact:true}).click();assert.match(await page.locator('#worked-analysis').innerText(),/not established emotions/);
  if(artifact)await page.screenshot({path:path.join(artifact,label+'-desktop.png'),fullPage:true});
  await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'mobile horizontal overflow');
  if(artifact)await page.screenshot({path:path.join(artifact,label+'-mobile.png'),fullPage:true});
  await page.locator('#search').fill('no-such-concept-xyz');assert.equal(await page.getByRole('status').textContent().then(t=>t.trim()),'No matching concepts.');await page.locator('#search').fill('');
  await page.getByRole('button',{name:'Explore',exact:true}).click();await page.locator('#concepts [data-id="context-01"]').click();await page.locator('details summary').click();assert.match(await page.locator('details').innerText(),/English entries/);
  await page.emulateMedia({media:'print'});assert.equal(await page.locator('.print-only').first().isVisible(),true);assert.equal(await page.locator('main').isVisible(),false);
  assert.deepEqual(errors,[]);assert.deepEqual(network,[]);await ctx.close();console.log(`PASS ${label}: navigation, comparison, overlapping lenses, context, sources, mobile overflow, reflection clearing, search, print visibility`);
 }
 const ctx=await browser.newContext({javaScriptEnabled:false,offline:true});const page=await ctx.newPage();await page.goto(pathToFileURL(path.join(dist,'print.html')).href);assert.equal(await page.locator('article').count(),10);assert.equal(await page.locator('script').count(),0);assert.match(await page.locator('body').innerText(),/Which bank/);
 if(artifact){await page.screenshot({path:path.join(artifact,'print-screen.png'),fullPage:true});await page.pdf({path:path.join(artifact,'print-proof.pdf'),format:'A4',preferCSSPageSize:true});}
 await ctx.close();console.log('PASS print: all five senses and five scenarios readable offline with JavaScript disabled');
}finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
