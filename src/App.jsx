import {
  CheckCircleIcon,
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const infoSections = [
  {
    title: 'System',
    items: [
      { label: 'System ID', value: 'SYD084' },
      { label: 'Asset Type', value: 'Query' },
      { label: 'Object Type', value: 'Presentation' },
      { label: 'Subject Matter', value: 'Customer Master' },
      { label: 'Refresh Cadence', value: 'Daily @ 02:00 UTC' },
    ],
  },
  {
    title: 'Details',
    items: [
      { label: 'Status', value: 'Design Review' },
      { label: 'Owner', value: 'Morgan Greer' },
      { label: 'Customer Tier', value: 'Global Enterprise' },
      { label: 'Region', value: 'North America' },
    ],
  },
  {
    title: 'Technical Details',
    items: [
      { label: 'Steward', value: 'Jordan Powell' },
      { label: 'Model Owner', value: 'Analytics Platform' },
      { label: 'Version', value: 'v2.4.1' },
      { label: 'Last Updated', value: 'Apr 18, 2024' },
    ],
  },
];

const queryTables = [
  {
    id: 'customers',
    label: 'Customers',
    chip: 'All Columns',
    fields: [
      'CustomerKey',
      'CustomerAlternateKey',
      'Title',
      'FirstName',
      'MiddleName',
      'LastName',
      'EmailAddress',
    ],
  },
  {
    id: 'orders',
    label: 'Orders',
    chip: 'Filtered',
    fields: ['OrderKey', 'OrderDate', 'DueDate', 'ShipDate', 'SalesOrderNumber', 'TotalDue'],
  },
];

const queryFields = [
  {
    key: 'field-1',
    expression: '[Customers].[CustomerKey]',
    alias: 'CustomerKey',
    type: 'Whole Number',
    description: 'Primary key used to relate customers to orders.',
    status: 'Readonly',
  },
  {
    key: 'field-2',
    expression: "CONCAT([Customers].[FirstName], ' ', [Customers].[LastName])",
    alias: 'CustomerName',
    type: 'Text',
    description: 'Display name stitched from first and last name.',
    status: 'Readonly',
  },
  {
    key: 'field-3',
    expression: 'COALESCE([Customers].[EmailAddress], \"unknown@domain.com\")',
    alias: 'EmailAddress',
    type: 'Text',
    description: 'Customer supplied email contact.',
    status: 'Readonly',
  },
  {
    key: 'field-4',
    expression: "CONCAT([Customers].[City], ', ', [Customers].[Country])",
    alias: 'CityCountry',
    type: 'Text',
    description: 'City and Country concatenated for reporting.',
    status: 'Calculated',
  },
  {
    key: 'field-5',
    expression: 'SUM([Orders].[TotalDue])',
    alias: 'TotalDue',
    type: 'Currency',
    description: 'Aggregated due amount over related orders.',
    status: 'Readonly',
  },
];

const joinEdges = [
  {
    id: 'edge-1',
    chip: 'ON COLUMN',
    joinType: 'INNER JOIN',
    description: '[Customers].[CustomerKey] = [Orders].[CustomerKey]',
    detail: 'Matches each order to its customer record.',
  },
  {
    id: 'edge-2',
    chip: 'ON EXPRESSION',
    joinType: 'LEFT JOIN',
    description: "[Orders].[OrderDate] >= DATEADD(day, -90, CURRENT_DATE)",
    detail: 'Limits the orders table to the rolling 90 day window.',
  },
];

const filters = [
  {
    chip: 'ON COLUMN',
    statement: "[Customers].[TerritoryGroup] = 'North America'",
  },
  {
    chip: 'ON EXPRESSION',
    statement: "DATE_TRUNC('month', [Orders].[OrderDate]) = DATE_TRUNC('month', CURRENT_DATE)",
  },
];

const elementDetail = {
  category: 'Customers',
  dataElement: 'CityCountry',
  alias: 'CityCountry',
  dataType: 'Text',
  description: 'City and Country',
  expression: "CONCAT([Customers].[City], ', ', [Customers].[Country])",
  sourceField: 'Customers.City, Customers.Country',
  usage: 'Displayed in presentation layers to surface locality.',
  preview: ['Seattle, USA', 'Berlin, Germany', 'Paris, France'],
};

const detailActions = [
  {
    label: 'Sort Order',
    value: 'Not Set',
    actionLabel: 'Set Sort Order',
  },
  {
    label: 'Affected Field',
    value: 'Not Selected',
    actionLabel: 'Select Affected Field',
  },
  {
    label: 'Filter Clauses',
    value: 'None Applied',
    actionLabel: 'Add Filter Clause',
  },
];

const TabButton = ({ label, active }) => (
  <button type="button" className={active ? 'tab-button active' : 'tab-button'} aria-pressed={active}>
    {label}
  </button>
);

const SidebarCard = ({ title, children }) => (
  <section className="sidebar-card">
    <header>
      <h3>{title}</h3>
    </header>
    <div className="sidebar-card-body">{children}</div>
  </section>
);

const TableNode = ({ label, chip, fields }) => (
  <div className="table-node">
    <header>
      <div>
        <span className="node-label">{label}</span>
        <span className="chip muted">{chip}</span>
      </div>
      <button type="button" className="node-menu" aria-label={`More options for ${label}`}>
        <EllipsisVerticalIcon aria-hidden="true" />
      </button>
    </header>
    <ul>
      {fields.map((field) => (
        <li key={field}>{field}</li>
      ))}
    </ul>
  </div>
);

const QueryFieldRow = ({ expression, alias, type, description, status }) => (
  <tr>
    <td>
      <span className="row-index">{alias.slice(0, 2).toUpperCase()}</span>
    </td>
    <td>
      <code>{expression}</code>
    </td>
    <td>{alias}</td>
    <td>{type}</td>
    <td>
      <div className="description-cell">
        <p>{description}</p>
        <span className="chip outline subtle">{status}</span>
      </div>
    </td>
  </tr>
);

const DetailMetaRow = ({ label, value }) => (
  <div className="detail-row">
    <div>
      <p className="detail-label">{label}</p>
      <p className="detail-value">{value}</p>
    </div>
  </div>
);

const DetailActionRow = ({ label, value, actionLabel }) => (
  <div className="detail-row actionable">
    <div>
      <p className="detail-label">{label}</p>
      <p className="detail-value muted">{value}</p>
    </div>
    <button type="button" className="ghost tertiary">{actionLabel}</button>
  </div>
);

const PreviewChip = ({ value }) => (
  <span className="preview-chip">{value}</span>
);

const JoinEdgeRow = ({ chip, joinType, description, detail }) => (
  <div className="join-edge">
    <div className="join-edge-header">
      <span className="chip muted">{chip}</span>
      <span className="chip join-type">{joinType}</span>
    </div>
    <p className="edge-expression">{description}</p>
    <p className="edge-detail">{detail}</p>
  </div>
);

const FilterRow = ({ chip, statement }) => (
  <div className="filter-row">
    <span className="chip muted">{chip}</span>
    <p>{statement}</p>
  </div>
);

const App = () => {
  return (
    <div className="app-shell">
      <header className="top-nav">
        <div className="brand">
          <span className="brand-mark">Syniti</span>
          <span className="brand-subtitle">Catalog Technical</span>
        </div>
        <div className="nav-actions">
          <button type="button" className="nav-circle" aria-label="Search" />
          <button type="button" className="nav-circle" aria-label="Notifications" />
          <button type="button" className="nav-circle" aria-label="Help" />
          <button type="button" className="avatar">YK</button>
        </div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <SidebarCard title="System">
            {infoSections[0].items.map(({ label, value }) => (
              <div className="sidebar-item" key={label}>
                <span className="label">{label}</span>
                <span className="value">{value}</span>
              </div>
            ))}
          </SidebarCard>

          <SidebarCard title="Description">
            <p className="description-text">
              Presentation query that combines enterprise customer attributes with rolling order
              activity for the PRO2394 system.
            </p>
          </SidebarCard>

          <SidebarCard title="Details">
            {infoSections[1].items.map(({ label, value }) => (
              <div className="sidebar-item" key={label}>
                <span className="label">{label}</span>
                <span className="value">{value}</span>
              </div>
            ))}
          </SidebarCard>

          <SidebarCard title="Technical Details">
            {infoSections[2].items.map(({ label, value }) => (
              <div className="sidebar-item" key={label}>
                <span className="label">{label}</span>
                <span className="value">{value}</span>
              </div>
            ))}
          </SidebarCard>
        </aside>

        <main className="main-area">
          <div className="page-header">
            <div>
              <p className="breadcrumbs">Home &gt; Systems &gt; SYD084 &gt; Presentations &gt; PRO2394</p>
              <h1>PRO2394</h1>
              <p className="subtitle">Customer presentation join with rolling order context</p>
            </div>
            <div className="header-actions">
              <button type="button" className="ghost">Discard</button>
              <button type="button" className="primary">Publish</button>
            </div>
          </div>

          <div className="tab-bar">
            <TabButton label="Query" active />
            <TabButton label="Filters" />
            <TabButton label="Fields" />
            <TabButton label="Events" />
            <TabButton label="Comments" />
          </div>

          <section className="query-surface">
            <header className="query-surface-header">
              <div>
                <h2>Query</h2>
                <p>Configure the selected tables, joins, and output expressions.</p>
              </div>
              <button type="button" className="secondary">
                <CheckCircleIcon aria-hidden="true" />
                Validate
              </button>
            </header>

            <div className="query-grid">
              <div className="query-left">
                <section className="query-card canvas-card">
                  <header>
                    <h3>Query Layout</h3>
                    <div className="canvas-tools">
                      <button type="button" className="ghost tertiary">Reset Canvas</button>
                      <button type="button" className="icon-button" aria-label="Suggest layout">
                        <SparklesIcon aria-hidden="true" />
                      </button>
                      <button type="button" className="icon-button" aria-label="More options">
                        <EllipsisHorizontalIcon aria-hidden="true" />
                      </button>
                    </div>
                  </header>
                  <div className="canvas-body">
                    <div className="table-stack">
                      {queryTables.map((table) => (
                        <TableNode key={table.id} {...table} />
                      ))}
                    </div>
                    <div className="canvas-connector" aria-hidden="true" />
                  </div>
                </section>

                <section className="query-card">
                  <header>
                    <h3>Data Elements</h3>
                    <div className="chip muted">Readonly</div>
                  </header>
                  <div className="table-wrapper">
                    <table>
                      <thead>
                        <tr>
                          <th aria-label="Row" />
                          <th>Expression</th>
                          <th>Alias</th>
                          <th>Type</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {queryFields.map((row) => (
                          <QueryFieldRow key={row.key} {...row} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="query-card results-card">
                  <header>
                    <h3>Query Results</h3>
                    <span className="chip outline">0 Rows</span>
                  </header>
                  <div className="results-placeholder">
                    <p>Start by selecting a data store</p>
                    <button type="button" className="primary ghosted">Select Data Store</button>
                  </div>
                </section>
              </div>

              <aside className="query-right">
                <section className="query-card detail-card">
                  <header>
                    <div>
                      <h3>Data Elements Detail</h3>
                      <p className="detail-subtitle">Configure metadata for the selected field.</p>
                    </div>
                    <span className="chip outline">Auto Builder</span>
                  </header>
                  <div className="detail-content">
                    <div className="detail-info">
                      <DetailMetaRow label="Category" value={elementDetail.category} />
                      <DetailMetaRow label="Data Element" value={elementDetail.dataElement} />
                      <DetailMetaRow label="Alias" value={elementDetail.alias} />
                      <DetailMetaRow label="Data Type" value={elementDetail.dataType} />

                      <div className="detail-block">
                        <p className="detail-label">Expression</p>
                        <div className="expression-card">
                          <code>{elementDetail.expression}</code>
                          <p className="expression-source">{elementDetail.sourceField}</p>
                        </div>
                      </div>

                      <div className="detail-block">
                        <p className="detail-label">Description</p>
                        <p className="detail-value">{elementDetail.description}</p>
                      </div>

                      <div className="detail-block">
                        <p className="detail-label">Usage</p>
                        <p className="detail-value muted">{elementDetail.usage}</p>
                      </div>

                      <div className="detail-block">
                        <p className="detail-label">Preview</p>
                        <div className="preview-grid">
                          {elementDetail.preview.map((value) => (
                            <PreviewChip key={value} value={value} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="detail-actions">
                      {detailActions.map((action) => (
                        <DetailActionRow key={action.label} {...action} />
                      ))}
                    </div>
                  </div>
                </section>

                <section className="query-card">
                  <header>
                    <h3>Join Detail</h3>
                    <span className="chip outline">Join Edges (2)</span>
                  </header>

                  <div className="chip-row">
                    <span className="chip muted">ON COLUMN</span>
                    <span className="chip muted">ON EXPRESSION</span>
                  </div>

                  <div className="join-edges">
                    {joinEdges.map((edge) => (
                      <JoinEdgeRow key={edge.id} {...edge} />
                    ))}
                  </div>
                </section>

                <section className="query-card">
                  <header>
                    <h3>Filters</h3>
                    <span className="chip outline">Readonly</span>
                  </header>
                  <div className="filters">
                    {filters.map((filter) => (
                      <FilterRow key={filter.statement} {...filter} />
                    ))}
                  </div>
                </section>
              </aside>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
