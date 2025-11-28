<template>
	<div class="page">
		<n-card class="header flex flex-col" content-style="padding:0">
		
			<div class="user-info flex flex-wrap">
				<div class="propic">
					<div class="rounded-full overflow-hidden w-28 h-28 border-2 border-primary">
						<img :src="chaiwatImage" alt="Profile Picture" />
					</div>
				</div>
				<div class="info grow flex flex-col justify-center">
					<div class="name">
						<h1>{{ profileUser.name }}</h1>
					</div>
					<div class="details flex flex-wrap">
						<div class="item">
							<n-tooltip placement="top">
								<template #trigger>
									<div class="tooltip-wrap">
										<Icon :name="RoleIcon"></Icon>
										<span>{{ profileRole.role_name }}</span>
									</div>
								</template>
								<span>Role</span>
							</n-tooltip>
						</div>

						<div class="item">
							<n-tooltip placement="top">
								<template #trigger>
									<div class="tooltip-wrap">
										<Icon :name="MailIcon"></Icon>
										<span>{{ profileUser.email }}</span>
									</div>
								</template>
								<span>Contacts</span>
							</n-tooltip>
						</div>
					</div>
				</div>
				<!-- <div class="  flex flex-col justify-center">
					<n-button size="large" type="info" round >Point 10</n-button>
				</div> -->
			</div>
		</n-card>
	</div>
</template>

<script lang="ts" setup>
import { NAvatar, NButton, NTooltip, NCard } from "naive-ui"
import { ref } from "vue"
import ImageCropper, { type ImageCropperResult } from "@/components/common/ImageCropper.vue"
import Icon from "@/components/common/Icon.vue"
import chaiwatImage from "@/assets/images/chaiwat.jpg"

const RoleIcon = "tabler:user"
const EditIcon = "uil:image-edit"
const MailIcon = "tabler:mail"

const propic = ref("/images/avatar.jpg")

const profileUser = ref(JSON.parse(localStorage.getItem("user") || "{}"))
const profileRole = ref(JSON.parse(localStorage.getItem("role") || "{}"))
function setCroppedImage(result: ImageCropperResult) {
	const canvas = result.canvas as HTMLCanvasElement
	propic.value = canvas.toDataURL()
}
</script>

<style lang="scss" scoped>
.page {
	.header {
		.user-info {
			gap: 30px;
			padding: 30px;
			padding-bottom: 20px;
			border-block-end: var(--border-small-050);
			container-type: inline-size;

			.propic {
				position: relative;
				height: 100px;

				.edit {
					display: none;
					align-items: center;
					justify-content: center;
					background-color: var(--primary-color);
					color: var(--bg-color);
					position: absolute;
					width: 26px;
					height: 26px;
					border-radius: 50%;
					top: -1px;
					right: -1px;
					border: 1px solid var(--bg-color);
					cursor: pointer;
				}
			}
			.info {
				.name {
					margin-bottom: 12px;

					@media (max-width: 450px) {
						h1 {
							font-size: 28px;
						}
					}
				}

				.details {
					gap: 24px;

					.item {
						.tooltip-wrap {
							display: flex;
							align-items: center;

							span {
								line-height: 1;
								margin-left: 8px;
							}
						}
					}
				}
			}

			@container (max-width: 900px) {
				.propic {
					.edit {
						display: flex;
					}
				}
				.actions {
					display: none;
				}
			}
		}
		.section-selector {
			padding: 0px 30px;
			padding-top: 15px;

			:deep() {
				.n-tabs .n-tabs-tab {
					padding-bottom: 20px;
				}
			}
		}
	}

	.main {
		margin-top: 18px;
	}
}
</style>
