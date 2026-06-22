import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'alerta',
    loadChildren: () => import('./alerta/alerta.module').then( m => m.AlertaPageModule)
  },
  {
    path: 'desenvolvedores',
    loadChildren: () => import('./desenvolvedores/desenvolvedores.module').then( m => m.DesenvolvedoresPageModule)
  },
  {
    path: 'direitos',
    loadChildren: () => import('./direitos/direitos.module').then( m => m.DireitosPageModule)
  },
  {
    path: 'simbolos',
    loadChildren: () => import('./simbolos/simbolos.module').then( m => m.SimbolosPageModule)
  },
  {
    path: 'sobre',
    loadChildren: () => import('./sobre/sobre.module').then( m => m.SobrePageModule)
  },
  {
    path: 'social',
    loadChildren: () => import('./social/social.module').then( m => m.SocialPageModule)
  },
  {
    path: 'cadastrar-assistidos',
    loadChildren: () => import('./cadastrar-assistidos/cadastrar-assistidos.module').then( m => m.CadastrarAssistidosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'grafico-evolucao/:id',
    loadChildren: () => import('./grafico-evolucao/grafico-evolucao.module').then( m => m.GraficoEvolucaoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menu-login',
    loadChildren: () => import('./menu-login/menu-login.module').then( m => m.MenuLoginPageModule)
  },
  {
    path: 'ficha-pessoal/:id',
    loadChildren: () => import('./pages/ficha-pessoal/ficha-pessoal.module').then( m => m.FichaPessoalPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'responsavel',
    loadChildren: () => import('./responsavel/responsavel.module').then( m => m.ResponsavelPageModule)
  },
  {
    path: 'pagina-medico',
    loadChildren: () => import('./pages/pagina-medico/pagina-medico.module').then( m => m.PaginaMedicoPageModule)
  },
  {
    path: 'pagina-professor',
    loadChildren: () => import('./pages/pagina-professor/pagina-professor.module').then( m => m.PaginaProfessorPageModule)
  },
  {
    path: 'questionario/:id',
    loadChildren: () => import('./pages/questionario/questionario.module').then( m => m.QuestionarioPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'responsavel-home',
    loadChildren: () => import('./pages/responsavel-home/responsavel-home.module').then( m => m.ResponsavelHomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profissional',
    loadChildren: () => import('./profissional/profissional.module').then( m => m.ProfissionalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
