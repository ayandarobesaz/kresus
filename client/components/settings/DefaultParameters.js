import { translate as $t } from '../../helpers';
import { Actions, store } from '../../store';

import OpCatChartPeriodSelect from '../shared/OpCatChartPeriodSelect';
import OpCatChartTypeSelect from '../shared/OpCatChartTypeSelect';

export default class DefaultParameters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            duplicateThreshold: store.getSetting('duplicateThreshold'),
            defaultChartType: store.getSetting('defaultChartType'),
            defaultChartPeriod: store.getSetting('defaultChartPeriod')
        };
    }

    onDuplicateThresholdChange() {
        let val = this.refs.duplicateThreshold.getDOMNode().value;
        Actions.changeSetting('duplicateThreshold', val);
        this.setState({
            duplicateThreshold: val
        });
        return true;
    }

    onDefaultOpCatKindChange() {
        let val = this.refs.defaultChartType.getValue();
        Actions.changeSetting('defaultChartType', val);
        this.setState({
            defaultChartType: val
        });
        return true;
    }

    onDefaultOpCatPeriodChange() {
        let val = this.refs.defaultChartPeriod.getValue();
        Actions.changeSetting('defaultChartPeriod', val);
        this.setState({
            defaultChartPeriod: val
        });
        return true;
    }

    render() {
        return (
            <form className="form-horizontal">

                <div className="form-group">
                    <label htmlFor="duplicateThreshold" className="col-xs-4 control-label">
                       { $t('client.settings.duplicate_threshold') }
                    </label>
                    <div className="col-xs-8">
                        <input id="duplicateThreshold" ref="duplicateThreshold"
                          type="number" className="form-control"
                          min="0" step="1"
                          value={ this.state.duplicateThreshold }
                          onChange={ this.onDuplicateThresholdChange.bind(this) }
                        />
                        <span className="help-block">
                           { $t('client.settings.duplicate_help') }
                        </span>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="defaultChartType" className="col-xs-4 control-label">
                        { $t('client.settings.default_chart_type') }
                    </label>
                    <div className="col-xs-8">
                        <OpCatChartTypeSelect
                          defaultValue={ this.state.defaultChartType }
                          onChange={ this.onDefaultOpCatKindChange.bind(this) }
                          ref="defaultChartType"
                          htmlId="defaultChartType"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="defaultChartPeriod" className="col-xs-4 control-label">
                        { $t('client.settings.default_chart_period') }
                    </label>
                    <div className="col-xs-8">
                        <OpCatChartPeriodSelect
                          defaultValue={ this.state.defaultChartPeriod }
                          onChange={ this.onDefaultOpCatPeriodChange.bind(this) }
                          ref="defaultChartPeriod"
                          htmlId="defaultChartPeriod"
                        />
                    </div>
                </div>

            </form>
        );
    }
}
