import './tokens/tokens.css';

document.getElementById('root')!.innerHTML = `
  <div style="padding: var(--spacing-8); max-width: 600px; margin: 0 auto; text-align: center;">
    <h1 style="font-size: var(--font-size-3xl); font-weight: var(--font-weight-bold); margin-bottom: var(--spacing-4);">
      Starter Design System
    </h1>
    <p style="color: var(--color-text-secondary); margin-bottom: var(--spacing-6);">
      Run <code style="font-family: var(--font-family-mono); background: var(--color-bg-sunken); padding: var(--spacing-1) var(--spacing-2); border-radius: var(--radius-md);">npm run storybook</code> to browse components.
    </p>
  </div>
`;
