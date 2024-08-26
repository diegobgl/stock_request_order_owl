from odoo import models, fields, api

class StockMove(models.Model):
    _inherit = 'stock.move'

    available_qty = fields.Float(string='Available Quantity', compute='_compute_available_qty')

    @api.depends('product_id', 'location_id')
    def _compute_available_qty(self):
        for move in self:
            if move.product_id and move.location_id:
                move.available_qty = move.product_id.with_context(location=move.location_id.id).qty_available
            else:
                move.available_qty = 0
