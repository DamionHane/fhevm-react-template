'use client';

import { EncryptionDemo } from '@/components/fhe/EncryptionDemo';
import { ComputationDemo } from '@/components/fhe/ComputationDemo';
import { KeyManager } from '@/components/fhe/KeyManager';
import { BankingExample } from '@/components/examples/BankingExample';
import { MedicalExample } from '@/components/examples/MedicalExample';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            FHEVM SDK Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the power of Fully Homomorphic Encryption in Next.js applications.
            Encrypt, compute, and decrypt data while maintaining complete privacy.
          </p>
        </header>

        {/* Key Manager */}
        <section className="mb-8">
          <KeyManager />
        </section>

        {/* Core Demos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <EncryptionDemo />
          <ComputationDemo />
        </div>

        {/* Use Case Examples */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Real-World Use Cases
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BankingExample />
            <MedicalExample />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-600">
          <p className="mb-2">
            Built with <a href="https://www.zama.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Zama FHEVM</a>
          </p>
          <p className="text-sm">
            Learn more in the <a href="https://docs.zama.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">documentation</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
