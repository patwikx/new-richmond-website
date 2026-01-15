"use client";

import { LegalLayout } from "@/components/layout/legal-layout";
import { COMPANY_INFO } from "@/lib/data";

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="January 15, 2026">
      <section className="space-y-12">
        <div>
          <h3>1. Introduction</h3>
          <p>
            {COMPANY_INFO.name} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
            or engage with our services.
          </p>
        </div>

        <div>
          <h3>2. Information We Collect</h3>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Submit an inquiry through our contact forms.</li>
            <li>Register for property viewings or events.</li>
            <li>Subscribe to our newsletters or updates.</li>
            <li>Interact with our customer support team.</li>
          </ul>
          <p className="mt-4">
            This information may include your name, email address, phone number, and specific property interests.
          </p>
        </div>

        <div>
          <h3>3. How We Use Your Information</h3>
          <p>We use the information we collect for various business purposes, including:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Providing and maintaining our services.</li>
            <li>Notifying you about changes to our properties or policies.</li>
            <li>Providing customer support and responding to inquiries.</li>
            <li>Monitoring the usage of our website to improve user experience.</li>
          </ul>
        </div>

        <div>
          <h3>4. Data Security</h3>
          <p>
            We have implemented appropriate technical and organizational security measures designed to protect the security of any 
            personal information we process. However, please also remember that we cannot guarantee that the internet itself is 
            100% secure. Although we will do our best to protect your personal information, transmission of personal information 
            to and from our services is at your own risk.
          </p>
        </div>

        <div>
          <h3>5. Contact Us</h3>
          <p>
            If you have questions or comments about this policy, you may email us at <span className="text-primary">{COMPANY_INFO.contact.email[0]}</span> 
            or by post to:
          </p>
          <div className="mt-4 p-6 border border-border bg-muted/10 font-mono text-sm">
            {COMPANY_INFO.name}<br />
            {COMPANY_INFO.address.line1}<br />
            {COMPANY_INFO.address.line2}<br />
            {COMPANY_INFO.address.city}, {COMPANY_INFO.address.country}
          </div>
        </div>
      </section>
    </LegalLayout>
  );
}