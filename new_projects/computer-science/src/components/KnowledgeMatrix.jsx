import React, { useState } from 'react';
import { Database, Filter, CheckCircle2, AlertCircle } from 'lucide-react';
import { CS_KNOWLEDGE_MATRIX } from '../utils/csData';
import { SoundEngine } from '../utils/soundEngine';

export function KnowledgeMatrix() {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedComplexity, setSelectedComplexity] = useState('all');

  const filteredData = CS_KNOWLEDGE_MATRIX.filter((item) => {
    const matchesSearch = item.structure.toLowerCase().includes(filterQuery.toLowerCase()) ||
                          item.note.toLowerCase().includes(filterQuery.toLowerCase());
    if (selectedComplexity === 'all') return matchesSearch;
    if (selectedComplexity === 'o1') return matchesSearch && (item.search.includes('O(1)') || item.access.includes('O(1)'));
    if (selectedComplexity === 'ologn') return matchesSearch && item.search.includes('O(log n)');
    return matchesSearch;
  });

  return (
    <section id="matrix" className="section-wrapper" style={{ background: '#FFFFFF' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Database size={14} /> CONCEPT 05 // TAXONOMY & KNOWLEDGE MATRIX
          </div>
          <h2 className="section-title">
            FOUNDATIONAL <span style={{ color: 'var(--cobalt-blue)' }}>DATA STRUCTURE</span> CHEAT SHEET
          </h2>
          <p className="section-subtitle">
            Trade-offs are the immutable law of system architecture. Access vs insertion, contiguous memory cache lines vs dynamic node fragmentation.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="brutal-card" style={{
          background: 'var(--bg-paper)',
          padding: '1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Search Input */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '240px' }}>
            <span className="font-mono" style={{ fontWeight: 800, fontSize: '0.85rem' }}>SEARCH:</span>
            <input
              type="text"
              placeholder="e.g. Hash Table, BST, Queue..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              style={{
                flex: 1,
                fontFamily: 'var(--font-mono)',
                padding: '0.4rem 0.75rem',
                border: 'var(--border-solid)',
                background: '#FFFFFF',
                outline: 'none',
                fontSize: '0.85rem'
              }}
            />
          </div>

          {/* Quick Filter Buttons */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'ALL STRUCTURES' },
              { id: 'o1', label: 'HAS O(1) OPS' },
              { id: 'ologn', label: 'HAS O(log n) SEARCH' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setSelectedComplexity(f.id);
                  SoundEngine.playClick();
                }}
                className="brutal-btn brutal-btn-sm"
                style={{
                  background: selectedComplexity === f.id ? 'var(--canary-yellow)' : '#FFF',
                  fontSize: '0.75rem'
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Neo-Brutalist Matrix Table */}
        <div style={{ overflowX: 'auto', border: 'var(--border-thick)', boxShadow: 'var(--shadow-lg)' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: '#FFFFFF',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem'
          }}>
            <thead>
              <tr style={{ background: '#0A0A0A', color: '#FFFFFF', textAlign: 'left' }}>
                <th style={{ padding: '0.85rem 1rem', borderRight: '1px solid #333' }}>DATA STRUCTURE</th>
                <th style={{ padding: '0.85rem 1rem', borderRight: '1px solid #333' }}>ACCESS</th>
                <th style={{ padding: '0.85rem 1rem', borderRight: '1px solid #333' }}>SEARCH</th>
                <th style={{ padding: '0.85rem 1rem', borderRight: '1px solid #333' }}>INSERTION</th>
                <th style={{ padding: '0.85rem 1rem', borderRight: '1px solid #333' }}>DELETION</th>
                <th style={{ padding: '0.85rem 1rem', borderRight: '1px solid #333' }}>SPACE</th>
                <th style={{ padding: '0.85rem 1rem' }}>HARDWARE / DESIGN INVARIANT</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: 'var(--border-solid)',
                    background: idx % 2 === 0 ? '#FFFFFF' : 'var(--bg-paper)',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 230, 0, 0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = idx % 2 === 0 ? '#FFFFFF' : 'var(--bg-paper)'}
                >
                  {/* Structure Name */}
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 800, borderRight: 'var(--border-solid)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '8px', height: '8px', background: row.color, border: '1px solid #000' }}></span>
                      <span>{row.structure}</span>
                    </div>
                  </td>

                  {/* Access */}
                  <td style={{ padding: '0.85rem 1rem', borderRight: 'var(--border-solid)' }}>
                    <span className={row.access.includes('O(1)') ? 'brutal-pill pill-mint' : ''}>
                      {row.access}
                    </span>
                  </td>

                  {/* Search */}
                  <td style={{ padding: '0.85rem 1rem', borderRight: 'var(--border-solid)' }}>
                    <span className={row.search.includes('O(1)') ? 'brutal-pill pill-mint' : row.search.includes('O(log') ? 'brutal-pill pill-blue' : ''}>
                      {row.search}
                    </span>
                  </td>

                  {/* Insertion */}
                  <td style={{ padding: '0.85rem 1rem', borderRight: 'var(--border-solid)' }}>
                    <span className={row.insert.includes('O(1)') ? 'brutal-pill pill-mint' : ''}>
                      {row.insert}
                    </span>
                  </td>

                  {/* Deletion */}
                  <td style={{ padding: '0.85rem 1rem', borderRight: 'var(--border-solid)' }}>
                    {row.delete}
                  </td>

                  {/* Space */}
                  <td style={{ padding: '0.85rem 1rem', borderRight: 'var(--border-solid)' }}>
                    {row.space}
                  </td>

                  {/* Architectural Invariant */}
                  <td style={{ padding: '0.85rem 1rem', color: '#444', fontSize: '0.8rem' }}>
                    {row.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
