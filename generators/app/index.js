const fs = require('fs');
const path = require('path');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    const config = this.config.getAll();
    const questions = [
      {
        type    : 'input',
        name    : 'author',
        message : 'Your name',
        store   : true,
        validate: (value) => {
          if (value) return true;
          return 'author name must be provided!';
        }
      },
      {
        type    : 'input',
        name    : 'email',
        message : 'Your email',
        store   : true,
        validate: (value) => {
          if (value) return true;
          return 'your email address must be provided!';
        }
      },
      {
        type    : 'input',
        name    : 'name',
        message : 'Your component name',
        default : 'newComponent',
        validate: (value) => {
          if (!value) return 'component name must be provided!';
          if (value.indexOf('-') !== -1) return 'component name must be camel case!';
          return true;
        }
      }
    ];
    return this.prompt(questions).then((answers) => {
      this.props = Object.assign({}, answers, {
        compName: answers.name.replace(/^[a-z]/, v => v.toUpperCase()),
      });
      this.log(this.destinationRoot(), this.sourceRoot());
    });
  }
  writing() {
    const files = fs.readdirSync(path.join(this.destinationRoot(), './src/components'));
    const exportComponents = files.map(comp => {
      return {
        dir: comp,
        componentName: comp.replace(/^[a-z]/, v => v.toUpperCase()),
      }
    });
    this.log(exportComponents);
    this.fs.copyTpl(
      this.templatePath('export.js'),
      this.destinationPath('src/index.js'),
      {
        exportComponents,
      }
    );
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(`src/components/${this.props.name}/index.js`),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath(`src/components/${this.props.name}/README.md`),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('Component.js'),
      this.destinationPath(`src/components/${this.props.name}/${this.props.compName}.js`),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('Component.css'),
      this.destinationPath(`src/components/${this.props.name}/${this.props.compName}.css`),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('demo/index.js'),
      this.destinationPath(`src/components/${this.props.name}/demo/index.js`),
      this.props
    );
  }
};