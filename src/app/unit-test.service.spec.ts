import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { UnitTestService } from './unit-test.service';

describe('UnitTestService', () => {
  let service: UnitTestService;
  let firestoreSpy: jasmine.SpyObj<AngularFirestore>;

  beforeEach(() => {
    const firestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);

    TestBed.configureTestingModule({
      providers: [
        UnitTestService,
        { provide: AngularFirestore, useValue: firestoreMock }
      ]
    });

    service = TestBed.inject(UnitTestService);
    firestoreSpy = TestBed.inject(AngularFirestore) as jasmine.SpyObj<AngularFirestore>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
