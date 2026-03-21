const subjects = [
  { name: "Indian Polity & Governance", topics: 142, color: "bg-accent" },
  { name: "History — Modern, Ancient, Medieval", topics: 198, color: "bg-primary" },
  { name: "Geography — Physical & Human", topics: 156, color: "bg-success" },
  { name: "Indian Economy", topics: 124, color: "bg-warning" },
  { name: "Environment & Ecology", topics: 89, color: "bg-accent" },
  { name: "Ethics, Integrity & Aptitude (GS4)", topics: 76, color: "bg-primary" },
  { name: "Essay Writing", topics: 48, color: "bg-success" },
  { name: "Science & Technology", topics: 95, color: "bg-warning" },
];

const SubjectsSection = () => {
  return (
    <section id="subjects" className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-700 tracking-tight md:text-4xl">
            Complete subject coverage
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Structured notes, PYQs, mind maps, and daily current affairs across all UPSC subjects.
          </p>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {subjects.map((subject) => (
            <div
              key={subject.name}
              className="group flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm hover:border-accent/30"
            >
              <div className={`h-2 w-2 rounded-full ${subject.color} shrink-0`} />
              <div className="min-w-0">
                <h3 className="text-sm font-medium truncate">{subject.name}</h3>
                <p className="font-mono-data text-xs text-muted-foreground">{subject.topics} topics</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-border bg-card p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Content Library</p>
              <p className="mt-1 font-mono-data text-2xl font-bold">2,400+</p>
              <p className="text-sm text-muted-foreground">Detailed notes & mind maps</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Question Bank</p>
              <p className="mt-1 font-mono-data text-2xl font-bold">15,000+</p>
              <p className="text-sm text-muted-foreground">MCQs with explanations</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Previous Year</p>
              <p className="mt-1 font-mono-data text-2xl font-bold">25 Years</p>
              <p className="text-sm text-muted-foreground">PYQ papers analyzed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubjectsSection;
