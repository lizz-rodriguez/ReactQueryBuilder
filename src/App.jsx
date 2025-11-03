import QueryBuilder from './components/QueryBuilder.jsx';

const SummaryItem = ({ label, value }) => (
  <div className="summary-item">
    <p className="summary-label">{label}</p>
    <p className="summary-value">{value}</p>
  </div>
);

const Section = ({ title, children }) => (
  <section className="card">
    <header className="card-header">
      <h3>{title}</h3>
    </header>
    <div className="card-body">{children}</div>
  </section>
);

const App = () => {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Syniti</h1>
          <p>Catalog Technical</p>
        </div>

        <nav className="tabs">
          {['Query', 'Filters', 'Fields', 'Events', 'Comments'].map((tab) => (
            <button
              key={tab}
              type="button"
              className={tab === 'Query' ? 'tab active' : 'tab'}
              aria-pressed={tab === 'Query'}
            >
              {tab}
            </button>
          ))}
        </nav>

        <Section title="System">
          <SummaryItem label="Component" value="UNIT Component Count" />
          <SummaryItem label="Asset Type" value="Derived" />
          <SummaryItem label="Object Type" value="Metric" />
          <SummaryItem label="Source System" value="Syniti" />
          <SummaryItem label="Last updated" value="Just Now" />
        </Section>

        <Section title="Description">
          <p className="muted">Monthly metric summarising unit conversion counts.</p>
        </Section>

        <Section title="Technical Details">
          <SummaryItem label="Category" value="Metrics" />
          <SummaryItem label="Domain" value="Operations" />
          <SummaryItem label="Owner" value="Syniti" />
        </Section>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <div>
            <p className="breadcrumb">Home / Systems / Syniti / Presentations / PRO2394</p>
            <h2>PRO2394</h2>
            <p className="muted">Query details and configuration</p>
          </div>
          <button type="button" className="primary-button">
            Publish
          </button>
        </header>

        <div className="content-grid">
          <Section title="Query Details">
            <div className="details-grid">
              <SummaryItem label="Created" value="Mar 14, 2024" />
              <SummaryItem label="Created by" value="Syniti" />
              <SummaryItem label="Status" value="Draft" />
              <SummaryItem label="Visibility" value="Internal" />
            </div>
          </Section>

          <Section title="Notes">
            <p className="muted">
              Use the query builder to design custom filters for this metric. Combine multiple
              conditions to target the exact records you need.
            </p>
          </Section>
        </div>

        <QueryBuilder />
      </main>
    </div>
  );
};

export default App;
