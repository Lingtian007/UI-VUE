<template>
	<div class="vue-bigdata-table-item-table">
		<table v-show="showTable && fixedCol >= 0" @paste="handlePaste" :class="['vue-bigdata-table-data-table', 'vue-bigdata-table-fixed-table', showFixedBoxShadow ? 'box-shadow' : '']" cellspacing="0" cellpadding="0" border="0">
			<colgroup>
				<col
					v-if="i <= fixedCol"
					:width="width" v-for="(width, i) in widthArr"
					:key="'colgroup-fixed-' + i"
				>
			</colgroup>
			<tbody>
				<tr
					v-for="(tr, index) in itemData"
					:key="index"
					:style="{background: currentMouseEnterIndex === index && canSelectText ? 'white' : ''}"
					:class="[stripe && (indexBase + index) % 2 !== 0 ? 'stripe-gray' : '', tr.className, currentScrollToRowIndex === indexBase + index ? 'scroll-to-row-tip' : '', indexBase + index === highlightRowIndex ? 'highlight-row' : '']"
					@click="handleClickTr(indexBase + index, tr.initRowIndex)"
					@mouseenter.stop="handleMouseIn(index)"
					@mouseleave.stop="handleMouseLeave">
					<td v-if="showIndex" :class="['vue-bigdata-table-cell', 'vue-bigdata-table-data-table-center']">
						<render-dom :render="indexRender" :back-value="{index: (indexBase + index), params: indexRenderParams}"></render-dom>
					</td>
					<td
						v-if="i <= fixedColCom"
						:data-row="indexBase + index"
						:data-col="i"
						@click="handleClickTd(indexBase + index, i, tr.initRowIndex)"
						@dblclick="handleDblclickTd(indexBase + index, i, (typeof td === 'object' && td !== null) ? td.value : td)"
						v-for="(td, i) in tr"
						:class="['vue-bigdata-table-cell',
								setAlign(i),
								(typeof td === 'object' && td !== null) ? td.className : '',
								getSelectCellClasses(indexBase + index, i)
							]"
						:style="rowStyles" :key="i">
						<template v-if="!canEdit || (canEdit && `${indexBase + index}-${i}` !== edittingTd)">
							<div v-if="!showCellRender[showIndex ? (i + 1) : i]" class="vue-bigdata-table-cell">{{ (typeof td === 'object' && td !== null) ? td.value : td }}</div>
							<template v-else>
								<render-dom :render="showCellRender[showIndex ? (i + 1) : i]" :back-value="{row: indexBase + index, col: i, value: (typeof td === 'object' && td !== null) ? td.value : td}"></render-dom>
							</template>
						</template>
						<render-dom v-else :render="editCellRender" :back-value="{row: indexBase + index, col: i, value: (typeof td === 'object' && td !== null) ? td.value : td, beforeSave}"></render-dom>
					</td>
				</tr>
			</tbody>
		</table>
		<table v-show="showTable" @paste="handlePaste" ref="itemTable" class="vue-bigdata-table-data-table vue-bigdata-table-content-table" :style="{position: fixedCol < 0 ? '' : 'absolute'}" cellspacing="0" cellpadding="0" border="0" width="100%">
			<colgroup>
				<col
					:width="width" v-for="(width, i) in widthArr"
					:key="'colgroup-' + i"
				>
			</colgroup>
			<tbody>
				<tr
					v-for="(tr, index) in itemData"
					:key="index"
					@click="handleClickTr(indexBase + index, tr.initRowIndex)"
					@mouseenter.stop="handleMouseIn(index)"
					@mouseleave.stop="handleMouseLeave"
					:style="{background: currentMouseEnterIndex === index && canSelectText ? 'rgba(64,158,255,0.3)' : ''}"
					:class="[stripe && (indexBase + index) % 2 !== 0 ? 'stripe-gray' : '', tr.className, currentScrollToRowIndex === indexBase + index ? 'scroll-to-row-tip' : '', indexBase + index === highlightRowIndex ? 'highlight-row' : '']">
					<td v-if="showIndex" :class="['vue-bigdata-table-cell', 'vue-bigdata-table-data-table-center']">
						<render-dom v-if="fixedCol < 0" :render="indexRender" :back-value="(indexBase + index)"></render-dom>
					</td>
					<td
						v-for="(td, i) in tr"
						:data-row="indexBase + index"
						:data-col="i"
						@click="handleClickTd(indexBase + index, i, tr.initRowIndex)"
						@dblclick="handleDblclickTd(indexBase + index, i, (typeof td === 'object' && td !== null) ? td.value : td)"
						:class="['vue-bigdata-table-cell',
								setAlign(i),
								(typeof td === 'object' && td !== null) ? td.className : '',
								getSelectCellClasses(indexBase + index, i)
							]"
						:style="rowStyles"
						:key="i">
						<template v-if="!canEdit || (canEdit && `${indexBase + index}-${i}` !== edittingTd)">
							<div v-if="true" class="vue-bigdata-table-cell">{{ (typeof td === 'object' && td !== null) ? td.value : td }}</div>
							<template v-else-if="i >= fixedCol">
								<render-dom :render="showCellRender[showIndex ? (i + 1) : i]" :back-value="{row: indexBase + index, col: i, value: (typeof td === 'object' && td !== null) ? td.value : td}"></render-dom>
							</template>
						</template>
						<render-dom v-else :render="editCellRender" :back-value="{row: indexBase + index, col: i, value: (typeof td === 'object' && td !== null) ? td.value : td, beforeSave, initRowIndex: tr.initRowIndex}"></render-dom>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
import renderDom from './renderDom';
export default {
	name: 'ItemTable',
	components: {
		renderDom
	},
	data () {
		return {
			prefix: 'vue-bigdata-table-data-table',
			tableWidth: 0,
			currentMouseEnterIndex: -1,
			editInputValue: ''
		};
	},
	props: {
		times: Number,
		tableIndex: Number,
		itemData: Array,
		rowStyles: Object,
		widthArr: Array,
		columns: Array,
		itemNum: Number,
		showIndex: Boolean,
		indexRender: Function,
		stripe: Boolean,
		fixedCol: Number,
		currentScrollToRowIndex: Number,
		canEdit: Boolean,
		edittingTd: String,
		startEditType: String,
		showFixedBoxShadow: Boolean,
		editCellRender: Function,
		beforeSave: Function,
		canSelectText: Boolean,
		startSelect: Object,
		endSelect: Object,
		disabledHover: Boolean,
		highlightRow: Boolean,
		highlightRowIndex: Number,
		indexRenderParams: Object
	},
	computed: {
		showTable () {
			return this.itemData.length > 0;
		},
		indexBase () {
			return this.times * this.itemNum * 3 + this.itemNum * (this.tableIndex - 1);
		},
		showCellRender () {
			return this.columns.map(item => {
				return item.cellRender ? item.cellRender : undefined;
			});
		},
		baseIndex () {
			return this.showIndex ? 1 : 0;
		},
		fixedColCom () {
			return this.showIndex ? (this.fixedCol - 1) : this.fixedCol;
		}
	},
	methods: {
		setAlign (i) {
			let columns = this.columns[i + this.baseIndex];
			if (!columns) return;
			let col = columns;
			return this.prefix + '-' + col.align;
		},
		backValue (row, col) {
			return {
				row: row,
				col: col
			};
		},
		handleMouseIn (index) {
			if (!this.disabledHover) return;
			this.currentMouseEnterIndex = index;
		},
		handleMouseLeave () {
			this.currentMouseEnterIndex = -1;
		},
		handleClickTr (row, initRowIndex) {
			this.$emit('on-click-tr', row, initRowIndex);
		},
		handleClickTd (row, col, initRowIndex) {
			this.$emit('on-click-td', { row, col, edittingTd: this.edittingTd, initRowIndex });
		},
		editCell (row, col) {
			this.$emit('on-edit-cell', row, col);
		},
		handleDblclickTd (row, col, value) {
			this.editInputValue = value;
			if (this.canEdit && this.startEditType === 'dblclick') this.editCell(row, col);
		},
		getSelectCellClasses (row, col) {
			let startSelect = this.startSelect;
			let endSelect = this.endSelect;
			let startRow = parseInt(startSelect['row']);
			let endRow = parseInt(endSelect['row']);
			let startCol = parseInt(startSelect['col']);
			return [
				((startRow === row) && startCol === col) ? 'start-select-cell' : '',
				((endRow === row) && endSelect['col'] === col) ? 'end-select-cell' : '',
				((startRow === row) && endSelect['col'] === col) ? 'right-top-select-cell' : '',
				((endRow === row) && startCol === col) ? 'left-bottom-select-cell' : '',
				((startRow === row) && col > startCol && col < endSelect['col']) ? 'top-center-select-cell' : '',
				((endRow === row) && col > startCol && col < endSelect['col']) ? 'bottom-center-select-cell' : '',
				(startCol === col && row > startRow && row < endRow) ? 'left-center-select-cell' : '',
				(endSelect['col'] === col && row > startRow && row < endRow) ? 'right-center-select-cell' : ''
			];
		},
		handlePaste (e) {
			const data = e.clipboardData.getData('text/plain');
			const rowsData = data.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map((row) => {
				return row.split('\t');
			});
			this.$emit('on-paste', rowsData);
		}
	}
};
</script>
