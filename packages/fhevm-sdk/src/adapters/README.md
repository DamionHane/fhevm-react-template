# Framework Adapters

This directory contains framework-specific adapters for the FHEVM SDK.

## Current Adapters

- **React**: Located in `../react/` - Provides hooks like `useFhevm`, `useEncrypt`, `useDecrypt`, and `useContract`

## Future Adapters

Potential framework adapters that can be added:

### Vue Adapter (`vue.ts`)

```typescript
// Example: Vue composables
export function useFhevm() {
  // Vue-specific implementation
}

export function useEncrypt() {
  // Vue-specific implementation
}
```

### Angular Adapter (`angular.ts`)

```typescript
// Example: Angular services
@Injectable()
export class FhevmService {
  // Angular-specific implementation
}
```

### Svelte Adapter (`svelte.ts`)

```typescript
// Example: Svelte stores
export const fhevmStore = writable(null);
```

## Adding a New Adapter

1. Create a new file in this directory (e.g., `vue.ts`)
2. Implement framework-specific wrappers around the core SDK
3. Export the adapter from `index.ts`
4. Update the main SDK exports
5. Add documentation and examples

## Design Principles

- **Core Independence**: Adapters should wrap the framework-agnostic core
- **Familiar Patterns**: Follow framework conventions (hooks for React, composables for Vue, etc.)
- **Type Safety**: Maintain full TypeScript support
- **Minimal Overhead**: Keep adapters lightweight
