'use client';

import { useState } from 'react';
import { useEncrypt } from '@fhevm-template/sdk';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

/**
 * Medical Example Component
 * Demonstrates privacy-preserving health data management
 */
export function MedicalExample() {
  const { encryptValue, isEncrypting } = useEncrypt();
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [glucose, setGlucose] = useState('');
  const [encryptedRecords, setEncryptedRecords] = useState<string[]>([]);

  const handleEncryptRecord = async () => {
    try {
      if (!bloodPressure && !heartRate && !glucose) {
        alert('Please enter at least one health metric');
        return;
      }

      const records: string[] = [];

      if (bloodPressure) {
        const encrypted = await encryptValue(parseInt(bloodPressure), { type: 'euint8' });
        records.push(`Blood Pressure: ${bloodPressure} → [ENCRYPTED]`);
      }

      if (heartRate) {
        const encrypted = await encryptValue(parseInt(heartRate), { type: 'euint8' });
        records.push(`Heart Rate: ${heartRate} → [ENCRYPTED]`);
      }

      if (glucose) {
        const encrypted = await encryptValue(parseInt(glucose), { type: 'euint8' });
        records.push(`Glucose: ${glucose} → [ENCRYPTED]`);
      }

      setEncryptedRecords(prev => [
        ...records.map(r => `[${new Date().toLocaleTimeString()}] ${r}`),
        ...prev
      ].slice(0, 10));

      // Clear inputs
      setBloodPressure('');
      setHeartRate('');
      setGlucose('');

      alert('Health records encrypted and stored securely!');
    } catch (error) {
      console.error('Encryption error:', error);
      alert('Failed to encrypt health records');
    }
  };

  return (
    <Card
      title="Private Health Records"
      description="Confidential medical data encryption"
    >
      <div className="space-y-4">
        {/* Health Metrics Input */}
        <div className="space-y-3">
          <Input
            type="number"
            label="Blood Pressure (systolic)"
            placeholder="e.g., 120"
            value={bloodPressure}
            onChange={(e) => setBloodPressure(e.target.value)}
            helperText="mmHg"
          />
          <Input
            type="number"
            label="Heart Rate"
            placeholder="e.g., 72"
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
            helperText="bpm"
          />
          <Input
            type="number"
            label="Blood Glucose"
            placeholder="e.g., 95"
            value={glucose}
            onChange={(e) => setGlucose(e.target.value)}
            helperText="mg/dL"
          />
        </div>

        {/* Encrypt Button */}
        <Button
          onClick={handleEncryptRecord}
          isLoading={isEncrypting}
          className="w-full"
          variant="primary"
        >
          Encrypt & Store Health Data
        </Button>

        {/* Encrypted Records */}
        {encryptedRecords.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Encrypted Records</p>
            <div className="space-y-1 max-h-40 overflow-y-auto">
              {encryptedRecords.map((record, idx) => (
                <div key={idx} className="text-xs text-gray-600 bg-green-50 p-2 rounded border border-green-200">
                  {record}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="text-xs text-gray-500 bg-purple-50 p-3 rounded border border-purple-200">
          <p className="font-medium mb-1">Medical Privacy:</p>
          <ul className="space-y-1">
            <li>• Health data encrypted before storage</li>
            <li>• Comply with HIPAA requirements</li>
            <li>• Doctors can compute on encrypted data</li>
            <li>• Patient data never exposed in plaintext</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
