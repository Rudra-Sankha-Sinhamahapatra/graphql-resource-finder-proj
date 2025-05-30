const stats = [
  { id: 1, name: 'Active Users', value: '10,000+' },
  { id: 2, name: 'Resources Shared', value: '50,000+' },
  { id: 3, name: 'Topics Covered', value: '100+' },
];

export default function StatsSection() {
  return (
    <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-24 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by developers worldwide
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Join thousands of developers who are already sharing and learning on DevLink
          </p>
        </div>
        <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
              <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
} 