import { PanAfricanExpansionDashboard } from "@/components/pan-african-expansion-dashboard"
import { PAN_AFRICAN_TEST_SIGNALS } from "@/lib/panAfricanExpansionFixtures"
import { buildExpansionQueue } from "@/lib/panAfricanExpansionService"

export const dynamic = "force-dynamic"

export default function PanAfricanExpansionPage() {
  const queue = buildExpansionQueue(PAN_AFRICAN_TEST_SIGNALS)
  return <PanAfricanExpansionDashboard queue={queue} />
}
