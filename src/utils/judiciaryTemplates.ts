export interface JudiciaryTemplate {
    id: string;
    name: string;
    description: string;
    content: string;
  }
  
  export const judiciaryTemplates: JudiciaryTemplate[] = [
    {
      id: "affidavit",
      name: "Affidavit",
      description: "A sworn statement of facts.",
      content: `
        <div class="p-6 border rounded-lg shadow-md bg-gray-50">
          <h2 class="text-xl font-bold text-center">AFFIDAVIT</h2>
          <p class="text-gray-700">I, <span class="text-blue-600">[Your Name]</span>, of <span class="text-blue-600">[Your Address]</span>, do hereby solemnly swear and affirm that:</p>
          <ol class="list-decimal ml-6 text-gray-700">
            <li>[Statement 1]</li>
            <li>[Statement 2]</li>
            <li>[Statement 3]</li>
          </ol>
          <p class="text-gray-700 mt-4">Signed this <span class="text-blue-600">[Date]</span> at <span class="text-blue-600">[Location]</span>.</p>
          <p class="text-gray-700 font-semibold mt-4">Signature: ___________________</p>
        </div>
      `,
    },
    {
      id: "summons",
      name: "Summons",
      description: "A legal order to appear in court.",
      content: `
        <div class="p-6 border rounded-lg shadow-md bg-white">
          <h2 class="text-xl font-bold text-center">SUMMONS</h2>
          <p class="text-gray-700">To: <span class="text-blue-600">[Defendant's Name]</span></p>
          <p class="text-gray-700">You are hereby summoned to appear before the <span class="text-blue-600">[Court Name]</span> at <span class="text-blue-600">[Court Address]</span> on <span class="text-blue-600">[Date]</span>.</p>
          <p class="text-gray-700 mt-4">Failure to appear may result in legal consequences.</p>
          <p class="text-gray-700 mt-4">Issued on <span class="text-blue-600">[Date]</span></p>
        </div>
      `,
    },
    {
      id: "contract",
      name: "Legal Contract",
      description: "A binding agreement between parties.",
      content: `
        <div class="p-6 border rounded-lg shadow-md bg-gray-50">
          <h2 class="text-xl font-bold text-center">LEGAL CONTRACT</h2>
          <p class="text-gray-700">This contract is made on <span class="text-blue-600">[Date]</span> between:</p>
          <p class="text-gray-700 font-semibold">Party A: <span class="text-blue-600">[Name]</span></p>
          <p class="text-gray-700 font-semibold">Party B: <span class="text-blue-600">[Name]</span></p>
          <p class="text-gray-700 mt-4">Terms and Conditions:</p>
          <ul class="list-disc ml-6 text-gray-700">
            <li>[Clause 1]</li>
            <li>[Clause 2]</li>
            <li>[Clause 3]</li>
          </ul>
          <p class="text-gray-700 mt-4">Signed:</p>
          <p class="text-gray-700 font-semibold">Party A: _______________</p>
          <p class="text-gray-700 font-semibold">Party B: _______________</p>
        </div>
      `,
    },
    {
      id: "witness_statement",
      name: "Witness Statement",
      description: "A statement given by a witness in a legal case.",
      content: `
        <div class="p-6 border rounded-lg shadow-md bg-white">
          <h2 class="text-xl font-bold text-center">WITNESS STATEMENT</h2>
          <p class="text-gray-700">I, <span class="text-blue-600">[Witness Name]</span>, residing at <span class="text-blue-600">[Address]</span>, state as follows:</p>
          <ol class="list-decimal ml-6 text-gray-700">
            <li>[Statement 1]</li>
            <li>[Statement 2]</li>
            <li>[Statement 3]</li>
          </ol>
          <p class="text-gray-700 mt-4">Signed on <span class="text-blue-600">[Date]</span></p>
          <p class="text-gray-700 font-semibold">Signature: ___________________</p>
        </div>
      `,
    },
    {
      id: "power_of_attorney",
      name: "Power of Attorney",
      description: "A legal document granting someone authority to act on behalf of another.",
      content: `
        <div class="p-6 border rounded-lg shadow-md bg-gray-50">
          <h2 class="text-xl font-bold text-center">POWER OF ATTORNEY</h2>
          <p class="text-gray-700">I, <span class="text-blue-600">[Grantor Name]</span>, hereby appoint <span class="text-blue-600">[Attorney Name]</span> as my lawful attorney.</p>
          <p class="text-gray-700 mt-4">This Power of Attorney is granted for the purpose of <span class="text-blue-600">[Purpose]</span>.</p>
          <p class="text-gray-700 mt-4">Executed on <span class="text-blue-600">[Date]</span> at <span class="text-blue-600">[Location]</span>.</p>
          <p class="text-gray-700 font-semibold">Signature: ___________________</p>
        </div>
      `,
    }
  ];
  