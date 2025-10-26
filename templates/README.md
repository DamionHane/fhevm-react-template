# FHEVM Templates

This directory contains starter templates for different frameworks showcasing the FHEVM SDK integration.

## Available Templates

### Next.js Template

The Next.js template is located in `../examples/nextjs-demo/` and demonstrates:

- Full Next.js 14 App Router integration
- FHEVM SDK setup with React hooks
- Encryption and decryption workflows
- Homomorphic computation examples
- Real-world use cases (Banking, Medical)

**Quick Start:**

```bash
# From root directory
npm install
npm run dev:nextjs
```

Or navigate to the example directly:

```bash
cd examples/nextjs-demo
npm install
npm run dev
```

## Creating a New Project

To create a new project based on these templates:

1. **Copy the template:**
   ```bash
   cp -r examples/nextjs-demo my-fhevm-project
   cd my-fhevm-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development:**
   ```bash
   npm run dev
   ```

## Template Structure

Each template includes:

- **SDK Integration**: Pre-configured FHEVM SDK setup
- **Components**: Reusable FHE components
- **Hooks**: Custom React hooks for FHE operations
- **Examples**: Real-world use case demonstrations
- **Documentation**: Setup and usage instructions
- **Configuration**: TypeScript, Tailwind CSS, and build tools

## Additional Templates

For more examples and use cases, check:

- `examples/anonymous-reporting/` - Full-featured whistleblowing application
- More templates coming soon!

## Learn More

- [FHEVM SDK Documentation](../packages/fhevm-sdk/README.md)
- [Getting Started Guide](../docs/getting-started.md)
- [Main README](../README.md)
