import React from "react";
import { Link } from "react-router-dom";
import { BRAND } from "../brandConfig";
import { ShieldCheck, HardDrive, AlertTriangle, Download, Lock } from "lucide-react";

export default function Privacy() {
  return (
    <div className="container" style={{ padding: "50px 20px 90px 20px", maxWidth: "850px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <span className="badge badge-gold" style={{ marginBottom: "8px" }}>
          Full Transparency
        </span>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--color-navy)", letterSpacing: "-0.5px" }}>
          Privacy Policy & Data Guarantees
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", margin: "8px auto 0 auto" }}>
          Effective Date: November 2026 • Product: {BRAND.productName}
        </p>
      </div>

      <div className="card" style={{ padding: "36px", display: "flex", flexDirection: "column", gap: "28px" }}>
        {/* Section 1 */}
        <div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--color-navy)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <Lock size={20} color="var(--color-royal-blue)" />
            1. No Compulsory User Account or Registration
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.7, margin: 0 }}>
            {BRAND.productName} does not require you to register, log in, verify your email address, or provide any payment details. You can begin drafting, editing, and downloading resumes immediately upon opening the website.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--color-navy)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <ShieldCheck size={20} color="#10B981" />
            2. 100% Client-Side Local Processing
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.7, margin: 0 }}>
            All resume rendering, styling, template calculations, and PDF generation occur directly inside your browser using client-side JavaScript. <strong>Your resume information is never uploaded to any custom backend server, remote database, or third-party cloud.</strong> We do not operate a database that collects or stores your resumes.
          </p>
        </div>

        {/* Section 3 */}
        <div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--color-navy)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <HardDrive size={20} color="var(--color-royal-blue)" />
            3. Browser Storage & IndexedDB Retention
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.7, marginBottom: "10px" }}>
            When you create and edit resumes, they are saved automatically into your browser's persistent IndexedDB storage engine. This allows you to close your tab or browser and return later on the same device to continue editing.
          </p>
          <div style={{ backgroundColor: "#FEF3C7", border: "1px solid #FCD34D", borderRadius: "8px", padding: "12px 16px", display: "flex", gap: "10px", alignItems: "flex-start" }}>
            <AlertTriangle size={20} color="#D97706" style={{ flexShrink: 0, marginTop: "2px" }} />
            <div style={{ fontSize: "0.88rem", color: "#92400E", lineHeight: 1.5 }}>
              <strong>Important Notice on Browser Storage:</strong> Because resumes are stored locally on your device, clearing your browser cache, site cookies/data, or using private/incognito browsing may permanently erase your stored resumes. Local browser storage is not equivalent to an encrypted multi-region cloud backup.
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--color-navy)", display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <Download size={20} color="var(--color-royal-blue)" />
            4. User Data Export & Backup Responsibility
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.7, margin: 0 }}>
            You have full ownership and control over your data. You can download your resumes at any time as standard A4 PDF documents or export your entire resume database as an unencrypted JSON backup file. Users are responsible for downloading and safeguarding their backup files if they wish to preserve their resumes long-term or transfer them to another device.
          </p>
        </div>

        {/* Section 5 */}
        <div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "12px" }}>
            5. Zero Hidden Tracking & Analytics
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.7, margin: 0 }}>
            We do not sell, rent, monetize, or transmit your career data to advertisers, recruiters, or data brokers. There are no covert tracking scripts or data scrapers embedded in our codebase.
          </p>
        </div>

        {/* Section 6 */}
        <div>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "12px" }}>
            6. Inquiries and Contact
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.7, margin: 0 }}>
            For architectural questions or source code verification regarding {BRAND.productName}, please visit our official GitHub repository under <strong>{BRAND.parentCompany}</strong> at{" "}
            <a href={BRAND.links.github} target="_blank" rel="noreferrer" style={{ fontWeight: 600 }}>
              github.com/damayanti-technologies/pratibha
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
