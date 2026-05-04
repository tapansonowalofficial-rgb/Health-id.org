# Contributing to Health-ID

Thank you for your interest in securing medical data! Please follow these guidelines:

## Code of Conduct
By participating, you agree to uphold our commitment to privacy and data integrity.

## Development Workflow
1. **Fork** the repository and create your branch from `main`.
2. **Modularize**: Do not add logic to `index.html`. Place business logic in `app/core/` and UI in `app/components/`.
3. **Security**: Any changes to the `crypto.js` module require extensive testing and documentation.

## Pull Request Process
- Ensure all CI/CD checks pass.
- Update `docs/API.md` if you add or modify an endpoint.
- Link your PR to a specific issue.
