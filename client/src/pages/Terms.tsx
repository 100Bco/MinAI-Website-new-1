import React from "react";
import { Link } from "wouter";
import { LegalLayout } from "@/components/LegalLayout";

export default function Terms() {
  return (
    <LegalLayout
      title="Terms of Use & Disclaimer"
      intro='These terms govern your use of minai.biz (the "site"), operated by MinAI Digital ("MinAI", "we", "us"). By using the site you agree to them. If you sign up for MinAI services, your service agreement also applies and controls if it conflicts with these terms.'
    >
      <h2>1. Using the site</h2>
      <ul>
        <li>Use the site only for lawful purposes and do not try to disrupt, scrape at scale, or gain unauthorized access to it.</li>
        <li>Information you submit must be accurate and yours to share.</li>
        <li>We may change, suspend or remove any part of the site at any time.</li>
      </ul>

      <h2>2. Results disclaimer</h2>
      <p>
        Statistics, case studies, testimonials and examples on this site describe specific situations or published industry
        research. They are not a promise or guarantee that you will get the same results. Results depend on your business,
        market, offer, effort and many other factors.
      </p>

      <h2>3. No professional advice</h2>
      <p>
        Content on the site is general information about marketing and software. It is not legal, financial, tax or other
        professional advice. Businesses in regulated fields (for example law firms, healthcare, insurance, mortgage and real
        estate) are responsible for making sure their own marketing follows the rules that apply to them.
      </p>

      <h2>4. AI-generated content</h2>
      <p>
        MinAI uses artificial intelligence to draft messages, answer questions and create content, and some images on this
        site were created with AI tools. AI output can be inaccurate or incomplete. Review important information before
        relying on it.
      </p>

      <h2>5. Intellectual property and trademarks</h2>
      <p>
        The site, its text, design, logos and software belong to MinAI or its licensors. You may not copy or reuse them
        without permission. Google, Meta, WordPress, GoDaddy, Canva and other third-party names and logos are trademarks of
        their respective owners. Their appearance on the site does not mean they sponsor or endorse MinAI.
      </p>

      <h2>6. Third-party links and tools</h2>
      <p>
        The site links to and embeds third-party services, such as our form, chat and video providers. We are not
        responsible for their content or practices; their own terms and privacy policies apply.
      </p>

      <h2>7. Disclaimer of warranties</h2>
      <p>
        The site is provided "as is" and "as available" without warranties of any kind, express or implied, including
        merchantability, fitness for a particular purpose and non-infringement, to the fullest extent the law allows.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        To the fullest extent the law allows, MinAI will not be liable for indirect, incidental, special, consequential or
        punitive damages, or for lost profits or data, arising from your use of the site. Our total liability for any claim
        about the site is limited to one hundred U.S. dollars (US$100).
      </p>

      <h2>9. Governing law</h2>
      <p>
        These terms are governed by the laws of the United States and of the state in which MinAI Digital is organized,
        without regard to conflict-of-law rules.
      </p>

      <h2>10. Accessibility</h2>
      <p>
        We want everyone to be able to use this site and work toward the Web Content Accessibility Guidelines (WCAG) 2.1
        level AA. If something on the site is hard to use, tell us through our <Link href="/contact">contact page</Link> and
        we will help and work on a fix.
      </p>

      <h2>11. Privacy</h2>
      <p>
        Our <Link href="/privacy">Privacy &amp; Cookie Policy</Link> explains how we handle personal information.
      </p>

      <h2>12. Changes and contact</h2>
      <p>
        We may update these terms; the effective date above shows the latest version. Questions? Reach us through our{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </LegalLayout>
  );
}
