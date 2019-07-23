import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ProjectsService } from '../../../services/project.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthorizationService } from 'src/app/services/authorization.service';


@Component({
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
  @Input() client;
  @Input() projectToEdit;
  @Output() saveProject = new EventEmitter();
  isAdmin : boolean;
  myForm;
  projectCopy;

  alias = [
    'Wordpress',
    'Woocommerce',
    'Prestashop',
    'Blog',
    'Html5',
    'Joomla'
  ];

  constructor(private fb: FormBuilder, private projectsService: ProjectsService, private authorization: AuthorizationService) { 

    this.authorization.userActive.subscribe(data => {
      this.client = data;
      console.log('vengo de authorization y soy data', data) // OK. Trae id de usuario (0, 1, 2)

    });
    
  }

  ngOnChanges(changes: SimpleChanges) {
    this.projectCopy = { ...changes.projectToEdit.currentValue };
  }

  ngOnInit() {
    if (this.client == 3) {
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
    }

    this.myForm = this.fb.group({
      client: this.client,
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
      webH: [''],
      usuarioH: [''],
      passH: ['']

    }
      // { validators: identityRevealedValidator }
    );


    if (this.projectToEdit) {

      this.myForm.patchValue({
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

  public submit(_id, form) {
    if (form.valid) {
      if (this.projectToEdit) {
        //console.log('editando projecto', this.projectToEdit._id)
        this.projectsService.editProject(this.projectToEdit._id, form.value);
      } else {
        this.projectsService.addProject(form.value, this.client);
      }
    }
  }


}
