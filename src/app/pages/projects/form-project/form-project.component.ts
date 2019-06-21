import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { ProjectsService } from '../../../services/project.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';


@Component ({
  selector: 'app-form-project',
  templateUrl: 'form-project.component.html',
  styleUrls: ['form-project.component.scss']
})

export class FormProjectComponent implements OnInit, OnChanges {


  // ngOnChanges(changes: SimpleChanges): void {
  //   if(changes && changes.projectToEdit && changes.projectToEdit.currentValue){
  //     console.log(changes);
  //   }
  // }
  @Input () projectToEdit;
  @Output() saveProject = new EventEmitter();

myForm;
projectCopy;

alias = [
  'alias 7',
  'alias 8',
  'Blog',
  'Html5'
];

  constructor(private fb: FormBuilder, private projectsService: ProjectsService ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.projectCopy = {...changes.projectToEdit.currentValue};
  }

  ngOnInit(){

    this.myForm = this.fb.group({

    alias: [''
    ],
    UrlDominio: [''
    ],
    UrlAdministracion: [''
    ],
    tareasRealizadas: [''
    ],
    host: [''
    ],
    puerto: [''
    ],
    cifrado: [''
    ],
    usuario: [''
    ],
    pass: [''
    ],
    userAdmin: [''
    ],
    passAdmin: [''
    ],
    webH: [''
    ],
    usuarioH: [''
  ],
    passH: [''
  ]

    }
    // { validators: identityRevealedValidator }
    );


    if (this.projectToEdit){

      this.myForm.setValue({
        alias: this.projectToEdit.alias,
        UrlDominio: this.projectToEdit.UrlDominio,
        UrlAdministracion: this.projectToEdit.UrlAdministracion,
        tareasRealizadas: this.projectToEdit.tareasRealizadas,
        host: this.projectToEdit.host,
        puerto: this.projectToEdit.puerto,
        cifrado: this.projectToEdit.cifrado,
        usuario: this.projectToEdit.usuario ? this.projectToEdit.usuario : '',
        pass: this.projectToEdit.pass,
        userAdmin: this.projectToEdit.userAdmin,
        passAdmin: this.projectToEdit.passAdmin,
        webH: this.projectToEdit.webH,
        usuarioH: this.projectToEdit.usuarioH,
        passH: this.projectToEdit.passH
      });
    }

  }

  public submit(e, form){
    if (form.valid) {
      if(this.projectToEdit){
        this.projectsService.editProject(this.projectToEdit.id, form.value);
      }else{
        this.projectsService.addProject(form.value);
      }
    }
  }


}
