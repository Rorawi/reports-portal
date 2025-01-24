from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Report(Base):
    __tablename__ = 'reports'

    id = Column(Integer, primary_key=True, index=True)
    month = Column(String, nullable=False)
    outreach_programs_current = Column(Integer, nullable=False)
    outreach_programs_previous = Column(Integer, nullable=False)
    outreach_programs_variance = Column(Integer, nullable=False)
    souls_won_current = Column(Integer, nullable=False)
    souls_won_previous = Column(Integer, nullable=False)
    souls_won_variance = Column(Integer, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
