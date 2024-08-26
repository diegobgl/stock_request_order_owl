/** @odoo-module **/

import { Component, useState, onWillStart } from 'owl';
import { registry } from '@web/core/registry';
import { useService } from "@web/core/utils/hooks";

class OwlWidget extends Component {
    setup() {
        this.orm = useService("orm");
        this.state = useState({
            availableQty: 0,
        });
        onWillStart(async () => {
            await this.loadAvailableQty();
        });
    }

    async loadAvailableQty() {
        const record = this.props.record;
        if (record && record.resModel === 'stock.move') {  // Cambiado a 'stock.move'
            const data = await this.orm.read('stock.move', [record.resId], ['available_qty']);
            this.state.availableQty = data[0]?.available_qty || 0;
        }
    }
    
    static template = tags.xml`
        <div>
            <t t-if="state.availableQty !== undefined">
                <h3>Available Quantity</h3>
                <p><t t-esc="state.availableQty"/> units</p>
            </t>
        </div>
    `;
}

registry.category('fields').add('owl_widget', OwlWidget);
