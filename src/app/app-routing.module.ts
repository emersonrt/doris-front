import { CadastroCandidatoComponent } from './views/cadastro-candidato/cadastro-candidato.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HardSkillsComponent } from './components/hard-skills/hard-skills.component';
import { SoftSkillsComponent } from './components/soft-skills/soft-skills.component';

const routes: Routes = [
    { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
    { path: 'landing-page', component: CadastroCandidatoComponent },
    { path: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlDDoWdpbmEgU2VsZcOnw6NvIEhhcmQgU2tpbGwgUMOhZ2luYSBTZWxlw6fDo28gSGFyZCBTa2lsbCBQw6FnaW5hIFNlbGXDp8OjbyBIYXJkIFNraWxsIFDDoWdpbmEgU2VsZcOnw6NvIEhhcmQgU2tpbGwgUMOhZ2luYSBTZWxlw6fDo28gSGFyZCBTa2lsbCBQw6FnaW5hIFNlbGXDp8OjbyBIYXJkIFNraWxsIFDDoWdpbmEgU2VsZcOnw6NvIEhhcmQgU2tpbGwgUMOhZ2luYSBTZWxlw6fDo28gSGFyZCBTa2lsbCBQw6FnaW5hIFNlbGXDp8OjbyBIYXJkIFNraWxsIFDDoWdpbmEgU2VsZcOnw6NvIEhhcmQgU2tpbGwgUMOhZ2luYSBTZWxlw6fDo28gSGFyZCBTa2lsbCBQw6FnaW5hIFNlbGXDp8OjbyBIYXJkIFNraWxsIiwiaWF0IjoxNTE2MjM5MDIyfQ.lyTAKvzAmyfW9hjvtdbxK3pT4SK7-NsJyQDXlu3i8zY', component: HardSkillsComponent },
    { path: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlDDoWdpbmEgU2VsZcOnw6NvIFNvZnQgU2tpbGwgUMOhZ2luYSBTZWxlw6fDo28gU29mdCBTa2lsbCBQw6FnaW5hIFNlbGXDp8OjbyBTb2Z0IFNraWxsIFDDoWdpbmEgU2VsZcOnw6NvIFNvZnQgU2tpbGwgUMOhZ2luYSBTZWxlw6fDo28gU29mdCBTa2lsbCBQw6FnaW5hIFNlbGXDp8OjbyBTb2Z0IFNraWxsIFDDoWdpbmEgU2VsZcOnw6NvIFNvZnQgU2tpbGwgUMOhZ2luYSBTZWxlw6fDo28gU29mdCBTa2lsbCBQw6FnaW5hIFNlbGXDp8OjbyBTb2Z0IFNraWxsIFDDoWdpbmEgU2VsZcOnw6NvIFNvZnQgU2tpbGwgUMOhZ2luYSBTZWxlw6fDo28gU29mdCBTa2lsbCBQw6FnaW5hIFNlbGXDp8OjbyBTb2Z0IFNraWxsIiwiaWF0IjoxNTE2MjM5MDIyfQ.kvxBDG6bZgHo6l6U-uwhA0DxUE1Uup9p88DuKinu4Lw', component: SoftSkillsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
