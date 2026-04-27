import React, { useState, useEffect } from 'react';
import { useScheduler } from '../../context/SchedulerContext';

// We will simulate syntax highlighting with basic styling since we don't have prism.js installed as a local package.
// For a production app, we would install prismjs and react-simple-code-editor, but this works well for zero-dependency.

const codes = {
  'fcfs': `// C pseudo-code for FCFS
void findWaitingTime(int processes[], int n, int bt[], int wt[], int at[]) {
    wt[0] = 0;
    int service_time[n];
    service_time[0] = at[0];
    
    for (int i = 1; i < n; i++) {
        service_time[i] = service_time[i-1] + bt[i-1];
        wt[i] = service_time[i] - at[i];
        if (wt[i] < 0) wt[i] = 0;
    }
}`,
  'sjf-np': `// C pseudo-code for SJF Non-Preemptive
void findWaitingTime(Process proc[], int n, int wt[]) {
    int rt[n];
    for (int i = 0; i < n; i++) rt[i] = proc[i].bt;
    
    int complete = 0, t = 0, minm = INT_MAX;
    int shortest = 0, finish_time;
    bool check = false;
    
    while (complete != n) {
        // Find shortest job among arrived processes
        for (int j = 0; j < n; j++) {
            if ((proc[j].art <= t) && (rt[j] < minm) && rt[j] > 0) {
                minm = rt[j];
                shortest = j;
                check = true;
            }
        }
        // ... runs to completion ...
    }
}`,
  'sjf-p': `// C pseudo-code for SRTF (Preemptive SJF)
void findWaitingTime(Process proc[], int n, int wt[]) {
    int rt[n];
    for (int i = 0; i < n; i++) rt[i] = proc[i].bt;
    
    int complete = 0, t = 0, minm = INT_MAX;
    int shortest = 0, finish_time;
    bool check = false;
    
    while (complete != n) {
        for (int j = 0; j < n; j++) {
            if ((proc[j].art <= t) && (rt[j] < minm) && rt[j] > 0) {
                minm = rt[j];
                shortest = j;
                check = true;
            }
        }
        if (check == false) { t++; continue; }
        
        rt[shortest]--;
        minm = rt[shortest];
        if (minm == 0) minm = INT_MAX;
        
        if (rt[shortest] == 0) {
            complete++;
            check = false;
            finish_time = t + 1;
            wt[shortest] = finish_time - proc[shortest].bt - proc[shortest].art;
            if (wt[shortest] < 0) wt[shortest] = 0;
        }
        t++;
    }
}`,
  'priority-np': `// C pseudo-code for Priority (Non-Preemptive)
bool comparison(Process a, Process b) {
    return (a.priority > b.priority); // Ascending priority
}

void findWaitingTime(Process proc[], int n, int wt[]) {
    sort(proc, proc + n, comparison);
    wt[0] = 0;
    
    for (int i = 1; i < n; i++) {
        wt[i] = proc[i-1].bt + wt[i-1];
    }
}`,
  'priority-p': `// C pseudo-code for Priority (Preemptive)
// Similar structure to SRTF, but minm logic compares priority instead of remaining time.
void findWaitingTime(Process proc[], int n, int wt[]) {
    // At every time step t, find arrived process with highest priority
    // execute it for 1 time unit
    // ...
}`,
  'rr': `// C pseudo-code for Round Robin
void findWaitingTime(int processes[], int n, int bt[], int wt[], int quantum) {
    int rem_bt[n];
    for (int i = 0 ; i < n ; i++) rem_bt[i] = bt[i];
    
    int t = 0; // Current time
    
    while (1) {
        bool done = true;
        for (int i = 0 ; i < n; i++) {
            if (rem_bt[i] > 0) {
                done = false;
                if (rem_bt[i] > quantum) {
                    t += quantum;
                    rem_bt[i] -= quantum;
                } else {
                    t = t + rem_bt[i];
                    wt[i] = t - bt[i];
                    rem_bt[i] = 0;
                }
            }
        }
        if (done == true) break;
    }
}`
};

const CodePanel = () => {
  const { algoId } = useScheduler();
  const [copied, setCopied] = useState(false);
  
  const code = codes[algoId] || '// Code not available';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ backgroundColor: '#1e1e1e', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--color-border)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#2d2d2d', padding: '0.5rem 1rem', borderBottom: '1px solid #3d3d3d' }}>
        <span style={{ color: '#d4d4d4', fontSize: '0.9rem', fontFamily: 'monospace' }}>implementation.c</span>
        <button 
          onClick={copyToClipboard}
          style={{ background: 'none', border: 'none', color: copied ? 'var(--color-accent-green)' : '#d4d4d4', cursor: 'pointer', fontSize: '0.9rem' }}
        >
          {copied ? '✓ Copied' : '📋 Copy'}
        </button>
      </div>
      <div style={{ padding: '1rem', overflowX: 'auto', backgroundColor: '#1e1e1e' }}>
        <pre style={{ margin: 0 }}>
          <code style={{ fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace', color: '#9cdcfe', fontSize: '0.9rem', lineHeight: '1.5' }}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodePanel;
