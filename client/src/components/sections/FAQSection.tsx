const faqs = [
  {
    question: "What is DevLink?",
    answer: "DevLink is a platform where developers can share and discover valuable learning resources. It's designed to help the community grow together by sharing knowledge.",
  },
  {
    question: "How do I share a resource?",
    answer: "Simply create an account, click on 'Create Resource', and fill in the details about the learning resource you want to share. It's that easy!",
  },
  {
    question: "Can I save resources for later?",
    answer: "Yes! Once you're logged in, you can bookmark any resource to access it later from your personal dashboard.",
  },
  {
    question: "Is DevLink free to use?",
    answer: "Yes, DevLink is completely free for all users. Create an account and start sharing and discovering resources today!",
  },
];

export default function FAQSection() {
  return (
    <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-24 lg:px-8">
      <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
        <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
        <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
          {faqs.map((faq) => (
            <div key={faq.question} className="pt-6">
              <dt>
                <span className="text-base font-semibold leading-7 text-gray-900">{faq.question}</span>
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
} 