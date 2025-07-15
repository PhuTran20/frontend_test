import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pharmacy-page-404',
  imports: [CommonModule],
  template: `
    <div class="error-container">
      <div class="error-content">
        <h1 class="error-code">404</h1>
        <h2 class="error-title">Page Not Found</h2>
        <p class="error-message">
          Sorry, the page you are looking for doesn't exist.
        </p>

        <button type="button" class="btn btn-primary" (click)="goToBuilder()">
          Go to Form Builder Now
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .error-container {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--bg-layout);
        padding: 2rem;
      }

      .error-content {
        text-align: center;
        background-color: white;
        padding: 3rem 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        max-width: 500px;
        width: 100%;
      }

      .error-code {
        font-size: 6rem;
        font-weight: 700;
        color: var(--bg-primary);
        margin-bottom: 1rem;
        line-height: 1;
      }

      .error-title {
        font-size: var(--font-size-lg);
        color: var(--bg-primary);
        margin-bottom: 1rem;
        font-weight: 600;
      }

      .error-message {
        color: #6f6f6f;
        font-size: var(--font-size-md);
        margin-bottom: 2rem;
        line-height: 1.5;
      }

      .btn {
        padding: 0.75rem 2rem;
        border: none;
        border-radius: 8px;
        font-size: var(--font-size-md);
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        text-decoration: none;
        display: inline-block;
      }

      .btn-primary {
        background-color: var(--bg-primary);
        color: var(--text-on-primary);
      }

      .btn-primary:hover {
        background-color: var(--accent-color);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(140, 0, 1, 0.3);
      }

      @media (max-width: 768px) {
        .error-container {
          padding: 1rem;
        }

        .error-content {
          padding: 2rem 1rem;
        }

        .error-code {
          font-size: 4rem;
        }

        .error-title {
          font-size: var(--font-size-md);
        }
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Page404Component implements OnInit {
  private readonly router = inject(Router);

  ngOnInit() {}

  ngOnDestroy() {}

  goToBuilder() {
    this.router.navigate(['/form/builder']);
  }
}
