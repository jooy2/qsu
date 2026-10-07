# Contributing to qsu

Thank you for contributing to the project. Your contributions will help us take the project to the next level.

This project adheres to the [Contributor Covenant](CODE_OF_CONDUCT.md) code of conduct, version 2.1. Your contribution implies that you have read and agree to this policy. Any behavior that undermines the quality of the project community, including this policy, will be warned or restricted by the maintainers.

## Repository layout

`qsu` is a monorepo. The same utility functions are published for three languages, and the documentation site covers all of them:

```
packages/
  javascript/   # npm package `qsu` (TypeScript source in lib/, built to dist/)
  dart/         # pub package `qsu` (lib/src/<category>.dart)
  python/       # PyPI package `qsu` (qsu/<category>/<functionName>.py)
docs/           # VitePress documentation site (en + ko), published to qsu.cdget.com
```

The point of the project is that a function behaves the same in every language it supports. A function keeps the same `camelCase` name, the same category and the same test cases in JavaScript, Dart and Python, even where that is not the idiomatic style of the language. Optional arguments follow each language instead: an options object in JavaScript, named parameters in Dart, a `dict` or keyword arguments in Python.

Not every function exists in every package. When you add one to a single language, say so in the pull request rather than leaving the gap unexplained.

## Development

Work inside the package you are changing:

| Package                           | Install                   | Test        | Analyze / Format                  |
| --------------------------------- | ------------------------- | ----------- | --------------------------------- |
| [JavaScript](packages/javascript) | `npm install`             | `npm test`  | `npm run lint` / `npm run format` |
| [Dart](packages/dart)             | `dart pub get`            | `dart test` | `dart analyze` / `dart format .`  |
| [Python](packages/python)         | `pip install -e ".[dev]"` | `pytest`    | `mypy`                            |

The documentation site needs Node.js 20 or later:

```bash
cd docs && npm install && npm run dev
```

Every reference page lives under both `docs/src/en/reference` and `docs/src/ko/reference`, and each package's example is written in its own `::: lang` block. A package with no block on a page is a package the sidebar reports as not having that function, so a missing example is a wrong answer rather than a gap.

## Issues

Issues can be created on the following page: https://github.com/jooy2/qsu/issues

Alternatively, you can reach the maintainers at https://cdget.com/contact. However, we prefer to track progress via GitHub Issues.

When creating an issue, keep the following in mind:

- Please specify the correct category selection based on the format of the issue (e.g., bug report, feature request).
- Check to see if there are duplicate issues.
- Describe in detail what is happening and what needs to be fixed. You may need additional materials such as images or video.
- Name the package and the version you are on, and the runtime you ran it with.
- Use appropriate keyword titles to make it easy for others to search and understand.
- Please use English in all content.

A security vulnerability is not a general issue. Report one through the process in [SECURITY.md](SECURITY.md).

## How to contribute (Pull Requests)

### Write the code you want to change

Here's the process for contributing to the project:

1. Clone the project (or rebase to the latest commit in the main branch)
2. Install the package (if the package manager exists)
3. Setting up lint or code formatter in the IDE (if your project includes a linter) and installing the relevant plugins. Some projects may use specific commands to check rules and perform formatting after module installation and before committing.
4. Write the code that needs to be fixed
5. Update the documentation (if it exists) or create a new one. If your project supports multilingual documentation, update the documentation for all languages. You can fill in the content in your own language and not translate it.
6. Add or modify tests as needed (if test code exists). You should also verify that existing tests pass.

### Write a commit message

While we don't have strict restrictions on commit messages, we recommend that you follow the recommendations below whenever possible:

- Write in English.
- Use the ` symbol to name functions, variables, or folders and files.
- Use a format like `xxx: message (fixes #1)`. The content in parentheses is optional.
- The message includes a summary of what was modified.
- It's a good idea to separate multiple modifications into their own commit messages.

It is recommended that you include a tag at the beginning of the commit message. Between the tag and the message, use `: ` between the tag and the message.

tags conform to the ["Udacity Git Commit Message Style Guide"](https://udacity.github.io/git-styleguide). However, you are welcome to use tags not listed here for additional situations.

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Changes to documentation
- `style`: Formatting, missing semicolons, etc.; no code change
- `refactor`: Refactoring production code
- `test`: Adding tests, refactoring test; no production code change
- `chore`: Updating build tasks, package manager configs, etc.; no production code change

Informal tags:

- `package`: Modifications to package settings, modules, or GitHub projects
- `typo`: Fix typos

Because the repository holds several packages, a commit also carries the scope it belongs to, in front of the tag: `javascript`, `dart`, `python`, or `common` for the documentation and anything that touches every package.

```text
[python] feat: add `getSlug` method
[common] docs: describe the `named` row of `ParamsTable`
```

A change that spans languages is usually easier to review as one commit per package.

### Create a pull request

When creating a pull request, keep the following in mind:

- Include a specific description of what the modification is, why it needs to be made, and how it works.
- Check to see if there are duplicate pull requests.
- Please use English in all content.

Typically, a project maintainer will review and test your code before merging it into the project. This process can take some time, and they may ask you for further edits or clarifications in the comments.

## Releasing

A maintainer releases each package on its own, from a tag of its own. The steps are the same for all three.

1. **Cut the version** in one commit per package on `main`. Raise the version in every file that carries it:
   - JavaScript: `version` in `packages/javascript/package.json`, and the same number twice at the top of `packages/javascript/package-lock.json`, as the file's own `version` and as `packages[""].version`. Running `npm version X.Y.Z --no-git-tag-version` in the package folder changes all three.
   - Dart: `version` in `packages/dart/pubspec.yaml`.
   - Python: `version` in `packages/python/pyproject.toml` and `__version__` in `packages/python/qsu/__init__.py`.

   In the package's `CHANGELOG.md`, add `## X.Y.Z (YYYY-MM-DD)` with the day's date directly under `## vNext (YYYY--)`. The unreleased entries become the release, and the empty `vNext` stays on top for the next one. Push, and let CI pass on that commit.

1. **Tag that commit** with the package's prefix, `javascript-v`, `dart-v` or `python-v`, and push the tag, as in `git tag javascript-v1.21.0` and `git push origin javascript-v1.21.0`.
1. **`.github/workflows/release.yml` does the rest.** `build` checks the tag against every file listed in the first step, builds the package the way its registry takes it, and writes the notes from the changelog. A `publish-*` job puts that build on npm, pub.dev or PyPI, and `github-release` then creates the GitHub release with the build attached: the `npm pack` tarball for JavaScript, and the wheel and the source archive for Python. A Dart release carries no build, because pub has no command that writes its archive to a file. Running the workflow again skips a version the registry already has and brings the release up to date.
1. **The release notes are the version's whole changelog section**, followed by a link to the package's `CHANGELOG.md` at that tag. Preview them with `node .github/scripts/release-notes.mjs javascript-v1.21.0`, which also refuses a tag that the files do not agree with.
1. **No registry token is stored anywhere.** npm, pub.dev and PyPI each trust `release.yml` in `jooy2/qsu` when it runs in the `release` environment, and trade the job's OIDC token for one that lasts minutes. Each registry keeps that trust in its own settings: the package's trusted publisher on npm, the automated publishing section of the Admin tab on pub.dev with the tag pattern `dart-v{{version}}`, and the project's Publishing page on PyPI. When a publish job fails, fix the cause and re-run the failed jobs. To publish by hand instead, check out the tag and run `npm publish` in `packages/javascript`, `dart pub publish` in `packages/dart`, or `python -m build` and `twine upload dist/qsu-X.Y.Z*` in `packages/python`, then re-run the workflow so that it skips the version and creates the release.
