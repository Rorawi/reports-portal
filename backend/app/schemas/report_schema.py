from pydantic import BaseModel, Field
from .step_one_schema import Report as StepOne
from .offetory_schema import Report as Offertory
from .soul_winning_schema import Report as SoulWinning
from .baptism_schema import Report as Baptism
import uuid

class Report(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))  # Generates a new ID for each report
    step_one: StepOne
    soul_winning: SoulWinning
    baptism: Baptism
    # isDraft: bool
    # offertory: Offertory


class ReportUpdate(BaseModel):
    isApproved: bool