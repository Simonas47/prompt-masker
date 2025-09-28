import { Component } from '@angular/core';

interface MaskingRule {
  original: string;
  replacement: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'prompt-masker';

  originalPrompt: string = '';
  highlightedPrompt: string = '';
  maskedPrompt: string = '';
  maskingRules: MaskingRule[] = [];
  newMaskWord: string = '';
  newMaskReplacement: string = '';

  // Common sensitive words to highlight
  private sensitivePatterns = [
    /\b\w+\.(com|org|net|io|dev|local)\b/gi, // domains
    /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g, // IP addresses
    /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g, // emails
    /\b(localhost|127\.0\.0\.1|0\.0\.0\.0)\b/gi, // local addresses
    /\b(api|service|server|database|db|host|endpoint)\w*[-_]\w*/gi, // service names
    /\b(prod|production|staging|dev|development|test|testing)[-_]\w*/gi, // environment names
    /\b[A-Z][A-Z_]{2,}\b/g, // constants in CAPS
  ];

  highlightSensitiveWords(): void {
    if (!this.originalPrompt) {
      this.highlightedPrompt = '';
      this.maskedPrompt = '';
      return;
    }

    let highlighted = this.originalPrompt;

    // Apply highlighting for sensitive patterns
    this.sensitivePatterns.forEach(pattern => {
      highlighted = highlighted.replace(pattern, (match) => {
        return `<span class="highlight" onclick="window.selectWord('${match}')">${match}</span>`;
      });
    });

    this.highlightedPrompt = highlighted;
    this.applyMasking();
  }

  addMaskRule(): void {
    if (!this.newMaskWord.trim() || !this.newMaskReplacement.trim()) {
      return;
    }

    const rule: MaskingRule = {
      original: this.newMaskWord.trim(),
      replacement: this.newMaskReplacement.trim()
    };

    // Check if rule already exists
    const exists = this.maskingRules.some(r => r.original.toLowerCase() === rule.original.toLowerCase());
    if (!exists) {
      this.maskingRules.push(rule);
      this.newMaskWord = '';
      this.newMaskReplacement = '';
      this.applyMasking();
    }
  }

  removeMaskRule(index: number): void {
    this.maskingRules.splice(index, 1);
    this.applyMasking();
  }

  applyMasking(): void {
    if (!this.originalPrompt) {
      this.maskedPrompt = '';
      return;
    }

    let masked = this.originalPrompt;

    // Apply all masking rules
    this.maskingRules.forEach(rule => {
      const regex = new RegExp(this.escapeRegex(rule.original), 'gi');
      masked = masked.replace(regex, rule.replacement);
    });

    this.maskedPrompt = masked;
  }

  private escapeRegex(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  copyToClipboard(): void {
    if (this.maskedPrompt) {
      navigator.clipboard.writeText(this.maskedPrompt).then(() => {
        alert('Masked prompt copied to clipboard!');
      }).catch(() => {
        alert('Failed to copy to clipboard. Please copy manually.');
      });
    }
  }

  downloadMaskedPrompt(): void {
    if (this.maskedPrompt) {
      const blob = new Blob([this.maskedPrompt], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'masked-prompt.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  }
}
