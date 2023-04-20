import { Meta, StoryObj } from "@storybook/react"
import { PlanDescription } from "../components/Plan/PlanDescription"

const meta: Meta<typeof PlanDescription> = {
  title: 'Plan description',
  component: PlanDescription
}

export default meta;
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    description: 'blah',
    specialDate: '4-20-23'
  }
}
