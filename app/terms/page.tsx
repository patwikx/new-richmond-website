"use client";

import { LegalLayout } from "@/components/layout/legal-layout";
import { COMPANY_INFO } from "@/lib/data";

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="January 15, 2026">
      <section className="space-y-12">
        <div>
          <h3>1. Agreement to Terms</h3>
          <p>
            These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;) 
            and {COMPANY_INFO.name} (&quot;we,&quot; &quot;us&quot; or &quot;our&quot;), concerning your access to and use of our website and related services.
          </p>
          <p className="mt-4">
            By accessing the site, you acknowledge that you have read, understood, and agree to be bound by all of these Terms of Service.
          </p>
        </div>

        <div>
          <h3>2. Intellectual Property Rights</h3>
          <p>
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, 
            website designs, audio, video, text, photographs, and graphics on the Site (collectively, the &quot;Content&quot;) and the trademarks, 
            service marks, and logos contained therein (the &quot;Marks&quot;) are owned or controlled by us or licensed to us, and are protected 
            by copyright and trademark laws.
          </p>
        </div>

        <div>
          <h3>3. User Representations</h3>
          <p>By using the Site, you represent and warrant that:</p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>All registration information you submit will be true, accurate, current, and complete.</li>
            <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
            <li>You will not access the Site through automated or non-human means, whether through a bot, script, or otherwise.</li>
            <li>You will not use the Site for any illegal or unauthorized purpose.</li>
          </ul>
        </div>

        <div>
          <h3>4. Prohibited Activities</h3>
          <p>
            You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not 
            be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
          </p>
        </div>

        <div>
          <h3>5. Limitation of Liability</h3>
          <p>
            In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, 
            consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, 
            or other damages arising from your use of the site.
          </p>
        </div>

        <div>
          <h3>6. Governing Law</h3>
          <p>
            These Terms shall be governed by and defined following the laws of the Republic of the Philippines. {COMPANY_INFO.name} and 
            yourself irrevocably consent that the courts of {COMPANY_INFO.address.city}, Philippines shall have exclusive jurisdiction 
            to resolve any dispute which may arise in connection with these terms.
          </p>
        </div>
      </section>
    </LegalLayout>
  );
}