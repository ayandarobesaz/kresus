// Global variables
import { Actions } from '../../store';
import { translate as $t } from '../../helpers';

export default class ImportModule extends React.Component {

    onImportInstance(e) {

        let $importFile = document.getElementById('importFile');
        if (!$importFile || !$importFile.files || !$importFile.files.length) {
            alert('Need to select a file!');
            e.preventDefault();
            return;
        }

        let fileReader = new FileReader;
        fileReader.onload = err => {
            let asText = err.target.result;
            let asJSON;
            try {
                asJSON = JSON.parse(asText);
                Actions.importInstance({
                    content: asJSON
                });
            } catch (jsonParseError) {
                if (jsonParseError instanceof SyntaxError) {
                    alert('JSON file to import isnt valid!');
                } else {
                    alert(`Unexpected error: ${jsonParseError.message}`);
                }
            }
        };
        fileReader.readAsText($importFile.files[0]);

        $importFile.value = '';

        e.preventDefault();
        return;
    }

    render() {
        return (
            <div className="row">
                <input
                  type="file"
                  name="importFile"
                  id="importFile"
                  className="col-xs-9"
                />
                <button
                  id="importInstance"
                  className="btn btn-primary col-xs-3"
                  onClick={ this.onImportInstance.bind(this) }>
                    { $t('client.settings.go_import_instance') }
                </button>
            </div>
        );
    }
}
