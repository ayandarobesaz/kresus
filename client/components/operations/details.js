import React from 'react';

import { assertHas, translate as $t } from '../../helpers';

import { DetailedViewLabel } from './label';
import DeleteOperation from './delete-operation';

import OperationTypeSelect from './operation-type-select';
import CategorySelect from './category-select';

export function computeAttachmentLink(op) {
    let file = op.binary.fileName || 'file';
    return `operations/${op.id}/${file}`;
}

export default class OperationDetails extends React.Component {
    constructor(props) {
        assertHas(props, 'onToggleDetails');
        assertHas(props, 'operation');
        assertHas(props, 'rowClassName');
        assertHas(props, 'formatCurrency');
        super(props);
    }

    render() {
        let op = this.props.operation;

        let maybeAttachment = '';
        if (op.binary !== null) {
            let opLink = computeAttachmentLink(op);
            maybeAttachment = (
                <span>
                    <a href={ opLink } target="_blank">
                        <span className="glyphicon glyphicon-file"></span>
                        { $t('client.operations.attached_file') }
                    </a>
                </span>
            );
        } else if (op.attachments && op.attachments.url !== null) {
            maybeAttachment = (
                <span>
                    <a href={ op.attachments.url } target="_blank">
                        <span className="glyphicon glyphicon-file"></span>
                        { $t(`client.${op.attachments.linkTranslationKey}`) }
                    </a>
                </span>
            );
        }

        return (
            <tr className={ this.props.rowClassName }>
                <td>
                    <a href="#" onClick={ this.props.onToggleDetails }>
                        <i className="fa fa-minus-square"></i>
                    </a>
                </td>
                <td colSpan="5" className="text-uppercase">
                    <ul>
                        <li>
                            { $t('client.operations.full_label') }
                            { op.raw }
                        </li>
                        <li className="form-inline">
                            { $t('client.operations.custom_label') }
                            <DetailedViewLabel operation={ op } />
                        </li>
                        <li>
                            { $t('client.operations.amount') }
                            { this.props.formatCurrency(op.amount) }
                        </li>
                        <li className="form-inline">
                            { $t('client.operations.type') }
                            <OperationTypeSelect operation={ op } />
                        </li>
                        <li className="form-inline">
                            { $t('client.operations.category') }
                            <CategorySelect operation={ op } />
                        </li>
                        { maybeAttachment }
                        <li>
                            <DeleteOperation
                              operation={ this.props.operation }
                              formatCurrency={ this.props.formatCurrency }
                            />
                        </li>
                    </ul>

                </td>
            </tr>
        );
    }
}
