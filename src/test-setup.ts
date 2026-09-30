import '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { provideZonelessChangeDetection } from '@angular/core';

TestBed.initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting()
);

TestBed.configureTestingModule({
  providers: [provideZonelessChangeDetection()],
});
