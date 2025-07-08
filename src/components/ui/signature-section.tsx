"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignatureUpload } from "@/components/ui/signature-upload";
import { cn } from "@/lib/utils";

interface SignaturePerson {
  id: string;
  name: string;
  signature: File | null;
}

interface SignatureSectionProps {
  title: string;
  people: SignaturePerson[];
  onPersonUpdate: (id: string, field: 'name' | 'signature', value: string | File | null) => void;
  className?: string;
}

export function SignatureSection({
  title,
  people,
  onPersonUpdate,
  className,
}: SignatureSectionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <Label className="text-base font-semibold">{title}:</Label>
      <div className="space-y-4">
        {people.map((person) => (
          <div key={person.id} className="space-y-3 p-4 border rounded-lg bg-muted/20">
            <Input 
              placeholder="Enter name" 
              className="h-9"
              value={person.name}
              onChange={(e) => onPersonUpdate(person.id, 'name', e.target.value)}
            />
            <SignatureUpload
              label="Upload Signature"
              value={person.signature}
              onChange={(file) => onPersonUpdate(person.id, 'signature', file)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface SingleSignatureSectionProps {
  title: string;
  name: string;
  signature: string;
  onUpdate: (field: 'name' | 'signature' | 'stamp', value: string) => void;
  className?: string;
  showStamp?: boolean;
  stamp?: string;
}

export function SingleSignatureSection({
  title,
  name,
  signature,
  onUpdate,
  className,
  showStamp = false,
  stamp = "",
}: SingleSignatureSectionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <Label className="text-base font-semibold">{title}</Label>
      <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
        <Input 
          placeholder="Enter name" 
          className="h-9"
          value={name}
          onChange={(e) => onUpdate('name', e.target.value)}
        />
        
        {/* Signature Line */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Signature:</Label>
          <div className="relative">
            <Input 
              placeholder="Type your signature here" 
              className="h-12 border-0 border-b-2 border-gray-300 focus:border-primary focus:ring-0 bg-transparent rounded-none"
              value={signature}
              onChange={(e) => onUpdate('signature', e.target.value)}
            />
          </div>
        </div>
        
        {/* Stamp Box */}
        {showStamp && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Stamp:</Label>
            <div className="w-24 h-24 border-2 border-dashed border-gray-400 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors shadow-sm">
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 