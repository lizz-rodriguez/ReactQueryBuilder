import { Fragment, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import clsx from 'clsx';
import { PlusCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const FIELD_OPTIONS = [
  { label: 'Employee ID', value: 'employeeId', type: 'number', placeholder: '1,001' },
  { label: 'Title', value: 'title', type: 'text', placeholder: 'Sales Manager' },
  { label: 'City', value: 'city', type: 'text', placeholder: 'Kirkland' },
  { label: 'Department', value: 'department', type: 'text', placeholder: 'Finance' },
  { label: 'Country', value: 'country', type: 'text', placeholder: 'United States' },
];

const OPERATOR_OPTIONS = [
  { label: 'Contains', value: 'contains' },
  { label: 'Equals', value: 'equals' },
  { label: 'Greater Than', value: 'greaterThan' },
  { label: 'Less Than', value: 'lessThan' },
  { label: 'Starts With', value: 'startsWith' },
];

const defaultRule = () => ({
  type: 'rule',
  id: nanoid(),
  field: FIELD_OPTIONS[0].value,
  operator: OPERATOR_OPTIONS[0].value,
  value: '',
});

const defaultGroup = () => ({
  type: 'group',
  id: nanoid(),
  combinator: 'AND',
  rules: [defaultRule()],
});

const createInitialQuery = () => {
  const firstRule = {
    type: 'rule',
    id: nanoid(),
    field: 'employeeId',
    operator: 'greaterThan',
    value: '1,001',
  };

  const secondGroup = {
    type: 'group',
    id: nanoid(),
    combinator: 'AND',
    rules: [
      {
        type: 'rule',
        id: nanoid(),
        field: 'title',
        operator: 'contains',
        value: 'Sales Manager',
      },
      {
        type: 'rule',
        id: nanoid(),
        field: 'city',
        operator: 'contains',
        value: 'Kirkland',
      },
    ],
  };

  return {
    type: 'group',
    id: nanoid(),
    combinator: 'AND',
    rules: [
      {
        type: 'group',
        id: nanoid(),
        combinator: 'AND',
        rules: [firstRule],
      },
      secondGroup,
    ],
  };
};

const applyToGroup = (group, targetId, transformer) => {
  if (group.id === targetId) {
    return transformer(group);
  }

  return {
    ...group,
    rules: group.rules.map((rule) =>
      rule.type === 'group' ? applyToGroup(rule, targetId, transformer) : rule
    ),
  };
};

const QueryRule = ({
  rule,
  groupId,
  onChange,
  onRemove,
}) => {
  const field = useMemo(
    () => FIELD_OPTIONS.find((option) => option.value === rule.field) ?? FIELD_OPTIONS[0],
    [rule.field]
  );

  const placeholder = field.placeholder ?? 'Value';

  return (
    <div className="rule-row">
      <div className="rule-control">
        <label className="sr-only" htmlFor={`field-${rule.id}`}>
          Field
        </label>
        <select
          id={`field-${rule.id}`}
          className="rule-select"
          value={rule.field}
          onChange={(event) => onChange(groupId, rule.id, { field: event.target.value })}
        >
          {FIELD_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="rule-control">
        <label className="sr-only" htmlFor={`operator-${rule.id}`}>
          Operator
        </label>
        <select
          id={`operator-${rule.id}`}
          className="rule-select"
          value={rule.operator}
          onChange={(event) => onChange(groupId, rule.id, { operator: event.target.value })}
        >
          {OPERATOR_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="rule-control">
        <label className="sr-only" htmlFor={`value-${rule.id}`}>
          Value
        </label>
        <input
          id={`value-${rule.id}`}
          className="rule-input"
          type={field.type === 'number' ? 'text' : field.type}
          placeholder={placeholder}
          value={rule.value}
          onChange={(event) => onChange(groupId, rule.id, { value: event.target.value })}
        />
      </div>

      <button
        type="button"
        className="icon-button"
        onClick={() => onRemove(groupId, rule.id)}
        aria-label="Remove rule"
      >
        <XMarkIcon aria-hidden="true" />
      </button>
    </div>
  );
};

const QueryGroup = ({
  group,
  parentId,
  depth,
  onToggle,
  onAddRule,
  onAddGroup,
  onRemoveGroup,
  onChangeRule,
  onRemoveRule,
}) => {
  const isRoot = depth === 0;

  return (
    <div className={clsx('query-group', { nested: depth > 0 })}>
      <div className="group-header">
        <div className="combinator-toggle" role="group" aria-label="Combinator">
          {['AND', 'OR'].map((value) => (
            <button
              key={value}
              type="button"
              className={clsx('toggle-chip', { active: group.combinator === value })}
              onClick={() => onToggle(group.id, value)}
            >
              {value}
            </button>
          ))}
        </div>
        <div className="group-actions">
          <button
            type="button"
            className="ghost-button"
            onClick={() => onAddRule(group.id)}
          >
            <PlusCircleIcon aria-hidden="true" />
            <span>Add condition</span>
          </button>
          <button
            type="button"
            className="ghost-button"
            onClick={() => onAddGroup(group.id)}
          >
            <PlusCircleIcon aria-hidden="true" />
            <span>Add group</span>
          </button>
          {!isRoot && (
            <button
              type="button"
              className="icon-button subtle"
              onClick={() => onRemoveGroup(parentId, group.id)}
              aria-label="Remove group"
            >
              <XMarkIcon aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <div className="group-body">
        {group.rules.map((item, index) => (
          <Fragment key={item.id}>
            {item.type === 'rule' ? (
              <QueryRule
                rule={item}
                groupId={group.id}
                onChange={onChangeRule}
                onRemove={onRemoveRule}
              />
            ) : (
              <div className="nested-connector" aria-hidden="true">
                <span className="connector-line" />
                <QueryGroup
                  group={item}
                  parentId={group.id}
                  depth={depth + 1}
                  onToggle={onToggle}
                  onAddRule={onAddRule}
                  onAddGroup={onAddGroup}
                  onRemoveGroup={onRemoveGroup}
                  onChangeRule={onChangeRule}
                  onRemoveRule={onRemoveRule}
                />
              </div>
            )}
            {index < group.rules.length - 1 && <div className="rule-divider" aria-hidden="true" />}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

const QueryBuilder = () => {
  const [query, setQuery] = useState(() => createInitialQuery());

  const handleToggle = (groupId, value) => {
    setQuery((current) => applyToGroup(current, groupId, (group) => ({
      ...group,
      combinator: value,
    })));
  };

  const handleAddRule = (groupId) => {
    const rule = defaultRule();
    setQuery((current) =>
      applyToGroup(current, groupId, (group) => ({
        ...group,
        rules: [...group.rules, rule],
      }))
    );
  };

  const handleAddGroup = (groupId) => {
    const group = defaultGroup();
    setQuery((current) =>
      applyToGroup(current, groupId, (target) => ({
        ...target,
        rules: [...target.rules, group],
      }))
    );
  };

  const handleChangeRule = (groupId, ruleId, changes) => {
    setQuery((current) =>
      applyToGroup(current, groupId, (group) => ({
        ...group,
        rules: group.rules.map((rule) =>
          rule.type === 'rule' && rule.id === ruleId ? { ...rule, ...changes } : rule
        ),
      }))
    );
  };

  const handleRemoveRule = (groupId, ruleId) => {
    setQuery((current) =>
      applyToGroup(current, groupId, (group) => ({
        ...group,
        rules: group.rules.filter((rule) => !(rule.type === 'rule' && rule.id === ruleId)),
      }))
    );
  };

  const handleRemoveGroup = (parentGroupId, groupId) => {
    setQuery((current) =>
      applyToGroup(current, parentGroupId, (group) => ({
        ...group,
        rules: group.rules.filter((rule) => !(rule.type === 'group' && rule.id === groupId)),
      }))
    );
  };

  return (
    <section className="panel">
      <header className="panel-header">
        <div>
          <h2>Where Clause</h2>
          <p>Build conditions to filter the data you are working with.</p>
        </div>
        <button type="button" className="primary-button">
          Save
        </button>
      </header>
      <div className="panel-body">
        <QueryGroup
          group={query}
          parentId={null}
          depth={0}
          onToggle={handleToggle}
          onAddRule={handleAddRule}
          onAddGroup={handleAddGroup}
          onRemoveGroup={handleRemoveGroup}
          onChangeRule={handleChangeRule}
          onRemoveRule={handleRemoveRule}
        />
      </div>
    </section>
  );
};

export default QueryBuilder;
