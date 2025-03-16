from pydantic import BaseModel
from typing import Optional

class Report(BaseModel):
    grossTithesCurrent: int
    grossTithesPrevious: int
    grossTithesVariance: int
    netTithesCurrent: int
    netTithesPrevious: int
    netTithesVariance: int
    missionsOfferingCurrent: int
    missionsOfferingPrevious: int
    missionsOfferingVariance: int
    designatedFundCurrent: int
    designatedFundPrevious: int
    designatedFundVariance: int
    localFundCurrent: int
    localFundPrevious: int
    localFundVariance: int
    localExpenditureCurrent: int
    localExpenditurePrevious: int
    localExpenditureVariance: int