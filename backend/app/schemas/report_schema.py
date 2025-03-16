from pydantic import BaseModel, Field
from .step_one_schema import Report as StepOne
from .offetory_schema import Report as Offertory
from .soul_winning_schema import Report as SoulWinning
from .baptism_schema import Report as Baptism
import uuid
from datetime import datetime

class Report(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))  # Generates a new ID for each report
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())  # Add this!
    step_one: StepOne
    soul_winning: SoulWinning
    baptism: Baptism
    isApproved: bool = False  # ✅ This ensures all reports start with `False`
    # isDraft: bool
    # offertory: Offertory