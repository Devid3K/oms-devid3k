import type { SelectRenderTag, SelectRenderLabel } from "naive-ui"
import { NTag, NButton } from "naive-ui"
import { h } from "vue"
const renderLabel: SelectRenderLabel = option => {
	return h(
		NButton,
		{
			round: true,
			type: "info",
			strong: true,
			size: "small"
		},
		h(
			"div",
			{
				class: "flex items-center text-white"
			},
			[option.label as string]
		)
	)
}
const renderMultipleSelectTag: SelectRenderTag = ({ option, handleClose }) => {
	return h(
		NButton,
		{
			round: true,
			onClose: (e: any) => {
				e.stopPropagation()
				handleClose()
			},
			type: "info",
			strong: true,
			size: "small"
		},
		{
			default: () =>
				h(
					"div",
					{
						class: "flex items-center text-white"
					},
					[option.label as string]
				)
		}
	)
}
const renderMultipleSelectTagPoint: SelectRenderTag = ({ option, handleClose }) => {
	return h(
		NTag,
		{
			round: true,
			type: "primary",
			bordered: false,
			onClose: e => {
				e.stopPropagation()
				handleClose()
			}
		},
		{
			default: () =>
				h(
					"div",
					{
						class: "flex items-center text-black"
					},
					[
						option.label as string,
						h(
							NButton,
							{
								size: "tiny",
								type: "error",
								circle: true,
								class: "!text-[8px] !ml-4 !w-[16px] !h-[16px] !text-center ",
								onClick: e => {
									e.stopPropagation()
								}
							},
							{
								default: () => option.totalJob
							}
						)
					]
				)
		}
	)
}

const renderSelectTypeFeedback: SelectRenderTag = ({ option, handleClose }) => {
	return h(
		NTag,
		{
			style: { padding: "10px 20px" },
			round: true,
			onClose: e => {
				e.stopPropagation()
				handleClose()
			}
		},
		{
			default: () =>
				h(
					"div",
					{
						class: [
							"flex items-center",
							option.value === 1
								? "!text-[#209788]"
								: option.value === 3
									? "!text-[#FF6D83]"
									: "!text-[#2B405B]"
						].join(" ")
					},
					[option.label as string]
				)
		}
	)
}
const renderLabelTypeFeedback: SelectRenderLabel = option => {
	return h(
		NTag,
		{
			round: true
		},
		h(
			"div",
			{
				class: [
					"flex items-center",
					option.value === 1 ? "!text-[#209788]" : option.value === 3 ? "!text-[#FF6D83]" : "!text-[#2B405B]"
				].join(" ")
			},
			[option.label as string]
		)
	)
}

const renderLabelCase: SelectRenderLabel = option => {
	return h(
		NTag,
		{
			class: [
				"flex items-center text-white !px-4",
				option.value === 1 ? "!bg-blue-500 " : option.value === 3 ? "!bg-red-500 " : "!bg-[#2B405B]",
			].join(" "),
			round: true,
			type: option.value === 1 ? "info" : option.value === 3 ? "error" : "success",
			bordered:false
		},
		h(
			"div",
			{
				class: ["flex items-center text-white"]
			},
			[option.label as string]
		)
	)
}
const renderSelectCase: SelectRenderTag = ({ option, handleClose }) => {
	return h(
		NTag,
		{
			class: [
				"flex items-center text-white !px-4",
				option.value === 1 ? "!bg-blue-500 " : option.value === 3 ? "!bg-red-500 " : "!bg-[#2B405B]",
			].join(" "),
			round: true,
			type: option.value === 1 ? "info" : option.value === 3 ? "error" : "success",
			onClose: (e:any) => {
				e.stopPropagation()
				handleClose()
			},
			bordered:false
		},
		{
			default: () =>
				h(
					"div",
					{
						class: ["flex items-center text-white "]
					},
					[option.label as string]
				)
		}
	)
}
export {
	renderMultipleSelectTag,
	renderMultipleSelectTagPoint,
	renderSelectTypeFeedback,
	renderLabelTypeFeedback,
	renderLabel,
	renderSelectCase,
	renderLabelCase
}
