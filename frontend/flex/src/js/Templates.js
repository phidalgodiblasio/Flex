import React, { Component } from 'react';
import PageHeader from './PageHeader';
import SecondaryButton from './SecondaryButton';
import { WithErrorMessage } from './WithErrorMessage';
import Template from './Template';
import { FaPlus } from 'react-icons/fa';
import styles from '../style/Template.module.css';
import SaveAllTemplatesPopUp from './SaveAllTemplatesPopUp';
import { withLocation } from './withLocation';

/* 
NEED TO FIGURE OUT HOW TO NAVIGATE WITH PROPS SENT IN (so i can start on the editing page if i want)

Need two states: editing and default
In the default state, I can copy directly from the prototypes
In the editing state, when you alter a template in any way, an icon will come up at the top allowing you to save or
discard changes. If they click save, it'll make a fetch to /flex/template-edit.
If they click discard, it'll make a fetch to /flex/template-{id} to replace the template with what's in the DB
*/

// TODO: If template is added, then the user tries to delete it, the fetch fails because the id doesn't match what's in the DB
//       Add calls should return the id of the template

class Templates extends Component {
  globalKey = 0;

  componentDidMount() {
    this.getAllTemplates();
  }

  constructor(props) {
    super(props)

    /*
    Template format:
    { id, name, exercises, edited, new }
    edited tells whether or not the template has been modified since the user started editing templates
    new tells whether or not a template has been added rather than pulled from the DB (to decide which fetch call to use if the user saves it)
    
    Exercise format:
    { id, name, numSets }
    id is added using globalKey, so react can render the exercises properly
    */

    let editing;
    if(props.location.state && props.location.state.editing) editing = true;
    else editing = false;

    this.state = {
      editing: editing,
      templates: [],
      popUpState: {
        active: false,
        hasBeenOpened: false,
      }
    }
  }

  getAllTemplates() {
    fetch(
      'http://localhost:8080/flex/template-all',
      {
        method: 'GET',
        credentials: 'include'
      }
    ).then(response => {
      if(response.status == 200) {
        response.json().then(templates => {
          templates = this.addInfoToTemplates(templates);
          
          this.setState({
            templates: templates
          })
        });
      } else {
        response.text().then(body => {
          this.props.showErrorMessage(body);
        })
      }
    }).catch(error => {
      this.props.showErrorMessage(error.toString());
    })
  }

  async popUpSelection(selection) {
    this.togglePopUp();

    if(selection) {
      // Don't toggle editing if unsuccessful in saving all templates
      if(!await this.saveAllTemplates()) return;
    } else {
      this.getAllTemplates();
    }

    this.toggleEditing();
  }

  addInfoToTemplates(templates) {
    return templates.map(template => {
      return {
        ...template,
        exercises: template.exercises.map(exercise => {
          return {
            id: this.globalKey++,
            name: exercise[0],
            numSets: parseInt(exercise[1])
          }
        }),
        edited: false,
        new: false,
      }
    })
  }

  togglePopUp() {
    this.setState({
      popUpState: {
        active: !this.state.popUpState.active,
        hasBeenOpened: true
      }
    })
  }

  finishEditing() {
    // If there is an edited template, prompt the user to save all changes
    // Otherwise, just toggle editing state
    if(this.state.templates.find(template => { return template.edited == true }) != null) {
      this.togglePopUp();
    } else {
      this.toggleEditing();
    }
  }

  toggleEditing() {
    // make sure to prompt the user if they want to save changes to edits
    this.setState({
      editing: !this.state.editing
    })
  }

  // Saves all edited templates to the backend
  // Returns true if templates were saved successfully,
  // Returns false if templates weren't saved successfully (templates aren't valid or fetch error)
  async saveAllTemplates() {
    // Go through every template, and call edit and add for all the ones that need it
    let editedTemplates = [];
    this.state.templates.forEach(template => {
      if(template.edited) editedTemplates.push(template);
    })

    // Save every template; return whether or not they were all successful
    let savePromises = editedTemplates.map(async template => {
      // Return a promise that resolves to true if the save was successful, or false if it failed
      return this.saveTemplate(template.id).then(success => {
        return success;
      })
    });

    // Check if all the templates saved successfully once they've all returned
    return Promise.all(savePromises).then(results => {
      if(results.includes(false)) {
        return false;
      } else {
        return true;
      }
    })
  }

  // Increment/decrement the number of sets for an exercise within a template.
  // incrementing => true if incrementing, false if decrementing
  incDecSets(templateId, exerciseId, incrementing) {
    let newTemplates = this.state.templates.map(template => {
      if(template.id != templateId) return template;

      return {
        ...template,
        exercises: template.exercises.map(exercise => {
          if(exercise.id != exerciseId) return exercise;

          return {
            ...exercise,
            numSets: incrementing ? exercise.numSets + 1 : exercise.numSets - 1
          }
        })
      }
    })

    this.updateTemplates(newTemplates, templateId);
  }

  addExerciseTo(templateId) {
    let newTemplates = this.state.templates.map(template => {
      if(template.id != templateId) return template;

      template.exercises.push({ id: this.globalKey++, name: "", numSets: 1 })
      return template;
    })

    this.updateTemplates(newTemplates, templateId);
  }

  handleChangeExerciseName(templateId, exerciseId, name) {
    let newTemplates = this.state.templates.map(template => {
      if(template.id != templateId) return template;

      return {
        ...template,
        exercises: template.exercises.map(exercise => {
          if(exercise.id != exerciseId) return exercise;

          return {
            ...exercise,
            name: name
          }
        })
      }
    })

    this.updateTemplates(newTemplates, templateId);
  }

  deleteSet(templateId, exerciseId) {
    let newTemplates = this.state.templates.map(template => {
      if(template.id != templateId) return template;

      let newExercises = [];

      template.exercises.forEach(exercise => {
        if(exercise.id != exerciseId) newExercises.push(exercise);
      });

      return {
        ...template,
        exercises: newExercises
      }
    })

    this.updateTemplates(newTemplates, templateId);
  }

  handleChangeTemplateName(templateId, name) {
    let newTemplates = this.state.templates.map(template => {
      if(template.id != templateId) return template;

      return {
        ...template,
        name: name
      }
    })

    this.updateTemplates(newTemplates, templateId);
  }

  deleteTemplate(templateId) {
    if(this.templateIsNew(templateId)) {
      this.removeTemplateFromState(templateId);
      return;
    }

    fetch(
      'http://localhost:8080/flex/template-delete',
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: templateId
      }
    ).then(response => {
      if(response.status == 200) {
        this.removeTemplateFromState(templateId);
      } else{
        response.text().then(body => {
          this.props.showErrorMessage(body);
        })
      }
    }).catch(error => {
      this.props.showErrorMessage(error.toString());
    })
  }

  removeTemplateFromState(templateId) {
    let newTemplates = [];
    this.state.templates.forEach(template => {
      if(template.id != templateId) newTemplates.push(template);
    })
    this.setState({
      templates: newTemplates
    })
  }

  // Save a template to the backend
  // Returns true if template was saved successfully,
  // Returns false if template wasn't saved successfully (template isn't valid or fetch error)
  async saveTemplate(templateId) {
    if(!this.validateTemplate(templateId)) return false;

    let templateToBackend = this.getTemplateToBackend(templateId);

    if(this.templateIsNew(templateId)) {
      // Add a new template to DB if this is a new template

      return fetch(
        'http://localhost:8080/flex/template-add',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(templateToBackend)
        }
      ).then(response => {
        if(response.status == 200) {
          response.text().then(id => console.log(`template-add returned ID: ${id}`));
          this.markAsAddedToDB(templateId);
          return true;
        } else{
          return response.text().then(body => {
            this.props.showErrorMessage(body);
            return false;
          })
        }
      }).catch(error => {
        this.props.showErrorMessage(error.toString());
        return false;
      })
    } else {
      // Update an existing template if this isn't a new template

      return fetch(
        'http://localhost:8080/flex/template-edit',
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(templateToBackend)
        }
      ).then(response => {
        if(response.status == 200) {
          this.markAsAddedToDB(templateId);
          return true;
        } else{
          return response.text().then(body => {
            this.props.showErrorMessage(body);
            return false;
          })
        }
      }).catch(error => {
        this.props.showErrorMessage(error.toString());
        return false;
      })
    }
  }

  // Check if templates are valid before saving to DB
  validateTemplate(templateId) {
    let valid = true;

    let template = this.state.templates.find(template => {
      return template.id == templateId;
    })

    if(template.name == "") {
      this.props.showErrorMessage("Please give your template a name before saving it.");
      valid = false;
    } else if(template.exercises.length == 0) {
      this.props.showErrorMessage("Please give your template exercises before saving it.");
      valid = false;
    } else if(template.exercises.find(exercise => { return exercise.name == "" }) != null) {
      this.props.showErrorMessage("Please give all exercises names before saving the template.");
      valid = false;
    }
    
    return valid;
  }

  getTemplateToBackend(templateId) {
    let template = this.state.templates.find(template => {
      return template.id == templateId;
    })

    let exercises = template.exercises.map(exercise => {
      return [exercise.name, exercise.numSets];
    })

    // Don't include ID when sending a new template to the backend
    if(template.new) {
      return {
        name: template.name,
        exercises: exercises
      }
    } else {
      return {
        id: template.id,
        name: template.name,
        exercises: exercises
      }
    }
  }

  markAsAddedToDB(templateId) {
    let newTemplates = this.state.templates.map(template => {
      if(template.id != templateId) return template;

      return {
        ...template,
        edited: false,
        new: false
      }
    })

    this.setState({
      templates: newTemplates
    })
  }

  // update the templates with newTemplates, then mark template with id == templateId as edited
  updateTemplates(newTemplates, templateId) {
    // Call setTemplateEdited after setState returns, so that the updated template gets modified
    this.setState({
      templates: newTemplates
    }, () => this.setTemplateEdited(templateId))
  }

  // Mark a template as edited
  setTemplateEdited(templateId) {
    let newTemplates = this.state.templates.map(template => {
      if(template.id != templateId) return template;

      return {
        ...template,
        edited: true
      }
    })

    this.setState({
      templates: newTemplates
    })
  }

  templateIsNew(templateId) {
    let isNew = false;
    this.state.templates.forEach(template => {
      if(template.id != templateId) return;

      isNew = template.new;
    })

    return isNew;
  }

  createNewTemplate() {
    let newTemplates = this.state.templates;
    newTemplates.push({
      id: Date.now(), // Give the template an ID that's incredibly unlikely to be used by any templates pulled from the DB
      name: "New Template",
      exercises: [{ id: this.globalKey++, name: "Exercise", numSets: 1}],
      edited: true,
      new: true
    })

    this.setState({
      templates: newTemplates
    })
  }

  render() {
    let editingButton = this.state.editing ? (
      <>
        <button className="primary-button" onClick={() => this.finishEditing()}>Finish Editing</button>
      </>
    ) : (
      <SecondaryButton className="right-secondary-button" onClick={() => this.toggleEditing()}>Edit Templates</SecondaryButton>
    )

    let templatesRender = this.state.templates.map(template => {
      return (
        <Template 
          key={template.id}
          template={template} 
          editing={this.state.editing} 
          incrementSets={(templateId, exerciseId) => this.incDecSets(templateId, exerciseId, true)}
          decrementSets={(templateId, exerciseId) => this.incDecSets(templateId, exerciseId, false)}
          addExerciseTo={(templateId) => this.addExerciseTo(templateId)}
          handleChangeExerciseName={(templateId, exerciseId, name) => this.handleChangeExerciseName(templateId, exerciseId, name)}
          deleteSet={(templateId, exerciseId) => this.deleteSet(templateId, exerciseId)}
          handleChangeTemplateName={(templateId, name) => this.handleChangeTemplateName(templateId, name)}
          deleteTemplate={(templateId) => this.deleteTemplate(templateId)}
          saveTemplate={(templateId) => this.saveTemplate(templateId)}
        />
      )
    })

    let addTemplateButton = this.state.editing ? (
      <button className={`primary-button ${styles.addTemplateButton}`} onClick={() => this.createNewTemplate()}><FaPlus /> Create a new template</button>
    ) : null;

    return (
      <>
      <SaveAllTemplatesPopUp 
        popUpSelection={(selection) => this.popUpSelection(selection)} 
        active={this.state.popUpState.active} 
        hasBeenOpened={this.state.popUpState.hasBeenOpened} 
      />
        <PageHeader title="Templates" rightButton={editingButton} />
        <div className={`container ${styles.templatesWrapper}`}>
          {templatesRender}
          {addTemplateButton}
        </div>
      </>
    )
  }
}

export default withLocation(WithErrorMessage(Templates));
