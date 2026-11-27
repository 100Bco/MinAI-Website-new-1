import React from "react";
import { Link } from "wouter";
import { LegalLayout } from "@/components/LegalLayout";
import { openCookieSettings } from "@/lib/consent";

const COOKIES = [
  { name: "minai_consent_v1 (local storage)", provider: "MinAI", category: "Essential", purpose: "Remembers your cookie choices.", duration: "6 months" },
  { name: "_ga", provider: "Google Analytics", category: "Analytics", purpose: "Distinguishes visitors to measure site usage.", duration: "2 years" },
  { name: "_ga_QHRM2K5NHH", provider: "Google Analytics", category: "Analytics", purpose: "Keeps session state for Google Analytics 4.", duration: "2 years" },
  { name: "Vercel Web Analytics", provider: "Vercel", category: "Analytics", purpose: "Counts page views without setting cookies.", duration: "No cookie" },
  { name: "Chat widget storage", provider: "LeadConnector", category: "Functional", purpose: "Keeps your live chat conversation open across pages.", duration: "Varies by provider" },
  { name: "Demo request form", provider: "LeadConnector (link.minai.biz)", category: "Essential when you use it", purpose: "Loads and submits the demo request form you choose to fill out.", duration: "Session" },
  { name: "Demo video", provider: "Google Drive", category: "Loaded when you press play", purpose: "Plays the embedded MinAI demo video.", duration: "Set by Google" },
];

export default function Privacy() {
  return (
    <LegalLayout
      title="Privacy & Cookie Policy"
      intro='This policy explains how MinAI Digital ("MinAI", "we", "us") collects, uses and shares information when you visit minai.biz, chat with us, or request a demo, and the choices you have.'
    >
      <h2>1. Information we collect</h2>
      <h3>Information you give us</h3>
      <ul>
        <li>Contact details you enter in the demo request form or chat, such as your name, email, phone number and business name.</li>
        <li>Anything you write in a message to us.</li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li>Device and usage data such as pages visited, referring site, browser type and approximate location derived from your IP address.</li>
        <li>This data is collected only through the cookies and tools you allow (see section 5).</li>
      </ul>
      <p>
        Please do not send sensitive information (for example health, financial account or Social Security numbers) through
        our forms or chat.
      </p>

      <h2>2. How we use information</h2>
      <ul>
        <li>To respond to your questions and schedule demos.</li>
        <li>To provide, set up and support the MinAI services you sign up for.</li>
        <li>To send messages you agreed to receive, including SMS (see section 4).</li>
        <li>To understand how the site is used and improve it.</li>
        <li>To protect the site, prevent fraud and meet legal obligations.</li>
      </ul>

      <h2>3. How we share information</h2>
      <p>We do not sell your personal information. We share it only with:</p>
      <ul>
        <li>Service providers that run our forms, chat, CRM, hosting and analytics (LeadConnector, Vercel, Google), under contracts that limit their use of the data.</li>
        <li>Authorities when required by law, or to protect our rights and users.</li>
        <li>A buyer or successor if our business is reorganized or sold.</li>
      </ul>

      <h2>4. Text messages (SMS)</h2>
      <p>
        If you give us your mobile number and agree to receive texts, we may send messages about your demo, your account
        and our services. Message frequency varies. Msg &amp; data rates may apply. Reply STOP to opt out at any time, or
        HELP for help. Consent to receive texts is not a condition of purchase. We do not share mobile numbers or SMS
        consent with third parties for their marketing.
      </p>

      <h2>5. Cookies and similar technologies</h2>
      <p>
        Essential storage keeps the site working. Analytics, functional and marketing tools load only after you allow them in
        the cookie banner. You can change your choice at any time:{" "}
        <button type="button" onClick={openCookieSettings} className="font-semibold text-blue-700 underline underline-offset-2">
          open cookie settings
        </button>
        .
      </p>
      <div className="overflow-x-auto mb-4 rounded-xl border border-slate-200">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-900">
            <tr>
              <th className="p-3 font-bold">Name</th>
              <th className="p-3 font-bold">Provider</th>
              <th className="p-3 font-bold">Category</th>
              <th className="p-3 font-bold">Purpose</th>
              <th className="p-3 font-bold">Duration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {COOKIES.map((c) => (
              <tr key={c.name}>
                <td className="p-3 font-medium text-slate-900">{c.name}</td>
                <td className="p-3">{c.provider}</td>
                <td className="p-3">{c.category}</td>
                <td className="p-3">{c.purpose}</td>
                <td className="p-3">{c.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>We do not currently use advertising pixels. If we add them, they will be listed here and stay off until you allow marketing cookies.</p>

      <h2>6. Global Privacy Control</h2>
      <p>
        We honor the Global Privacy Control (GPC) signal. If your browser sends it, we treat it as a request to opt out of
        the sale or sharing of your personal information and of targeted advertising, and marketing cookies stay off.
      </p>

      <h2>7. Your privacy rights</h2>
      <p>
        Depending on where you live (for example California, Colorado, Connecticut, Texas, Virginia and other U.S. states),
        you may have the right to:
      </p>
      <ul>
        <li>Know and access the personal information we hold about you.</li>
        <li>Correct inaccurate information.</li>
        <li>Delete your information.</li>
        <li>Get a copy of your information in a portable format.</li>
        <li>Opt out of the sale or sharing of personal information, targeted advertising and profiling.</li>
        <li>Appeal our decision about your request.</li>
      </ul>
      <p>
        To make a request, contact us through our <Link href="/contact">contact page</Link>. We will verify your request and
        respond within the time the law requires. We will not discriminate against you for using these rights.
      </p>

      <h2>8. Data retention and security</h2>
      <p>
        We keep personal information only as long as needed for the purposes above or as the law requires, then delete or
        anonymize it. We use reasonable technical and organizational safeguards, but no system is completely secure.
      </p>

      <h2>9. Children</h2>
      <p>This site is for businesses and is not directed to children under 13. We do not knowingly collect their information.</p>

      <h2>10. Changes to this policy</h2>
      <p>We may update this policy. The effective date above shows when it last changed.</p>

      <h2>11. Contact us</h2>
      <p>
        Questions about this policy or your data? Reach us through our <Link href="/contact">contact page</Link>.
      </p>
    </LegalLayout>
  );
}
