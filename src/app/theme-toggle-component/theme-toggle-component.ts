import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toggle-component',
  imports: [ CommonModule ],
  templateUrl: './theme-toggle-component.html',
  styleUrl: './theme-toggle-component.css'
})
export class ThemeToggleComponent {

icon = '🌙';

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      this.icon = '☀️';
    }
  }

  toggleTheme() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    this.icon = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
  
}
