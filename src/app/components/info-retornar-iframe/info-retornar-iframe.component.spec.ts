import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRetornarIframeComponent } from './info-retornar-iframe.component';

describe('InfoRetornarIframeComponent', () => {
    let component: InfoRetornarIframeComponent;
    let fixture: ComponentFixture<InfoRetornarIframeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InfoRetornarIframeComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(InfoRetornarIframeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
