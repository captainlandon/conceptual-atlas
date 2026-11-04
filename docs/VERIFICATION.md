# Version 0.2 verification

## Passed locally

- Record, expression, mapping, source and scenario integrity validation.
- Twelve regression tests, including dangling references, duplicate records/expressions, missing provenance, missing language metadata, source references and unreviewed exact-equivalence rejection.
- TypeScript compilation and Vite production build, followed by self-contained packaging.
- Automated Chromium checks on a local HTTP-served build and a `file://` build with networking disabled: concept navigation, comparison, multiple lens selection, worked explanations, reflection clearing, empty search, source sections, expressions, mobile overflow and print visibility.
- Standalone print HTML opened offline with JavaScript disabled: all five concepts and five worked situations are present.
- Rendered desktop and 390px mobile screenshots inspected. Browser-generated A4 print proof inspected: 11 pages, including entry routes, five senses and five worked situations. Content is readable and no short spillover pages remain.

Browser checks use one Linux Chromium environment. They do not establish assistive-technology conformance or full Windows/macOS/mobile device compatibility. Actual printer proofing and independent human accessibility testing remain pending.

## Content status

Six references support a bounded AI-assisted source comparison. All senses remain drafts pending independent specialist review. The uncertainty entry is an explicitly scoped working definition; the certainty reference supports a distinction in its limits note. Relationship explanations and worked examples are editorial proposals.

The current collection remains English only. Tests exercise multilingual metadata and Unicode without publishing unreviewed translations. No educational efficacy result or complete multilingual coverage is claimed.

## Repeat

```sh
npm ci
npm test
npm run build
npx playwright install chromium
npm run test:browser
```

`ATLAS_BROWSER_EXECUTABLE` optionally selects an installed compatible browser. `ATLAS_TEST_ARTIFACTS` optionally writes inspection screenshots and a temporary print proof. These are QA aids, not published content or user submissions.
