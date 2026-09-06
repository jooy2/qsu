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

The documentation site uses pnpm and needs Node.js 18 or later:

```bash
cd docs && pnpm install && pnpm run dev
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
