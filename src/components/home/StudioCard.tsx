
import React from 'react';
import { Heart, Star, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card } from '@/components/ui/card';

interface StudioCardProps {
  id: string;
  name: string;
  image: string;
  rating?: number;
  deliveryTime?: string; // Keeping the prop in the interface for backward compatibility
  distance?: string;
  workingHours?: string;
  index: number;
  promoted?: boolean;
}

const StudioCard: React.FC<StudioCardProps> = ({
  id,
  name,
  image,
  rating,
  distance,
  workingHours,
  index,
  promoted = false
}) => {
  // Check if the studio is Busy Bee to use the custom logo
  const isBusyBee = name.toLowerCase().includes('busy bee');
  
  // Custom styling and content for Busy Bee
  if (isBusyBee) {
    return (
      <Link 
        to={`/studio/${id}`} 
        style={{
          animationDelay: `${200 + index * 100}ms`
        }} 
        className="animate-fade-in block px-[14px]"
      >
        <Card className="overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
          {/* Custom Busy Bee header with logo */}
          <div className="relative">
            <AspectRatio ratio={16 / 9} className="w-full">
              <div className="h-full w-full bg-white flex items-center justify-center p-4">
                <div className="flex flex-col items-center justify-center w-full">
                  <img 
                    src="/lovable-uploads/95b97c87-0963-424b-ad2b-400d1104bfd2.png" 
                    alt="Busy Bees" 
                    className="max-h-full max-w-full object-contain" 
                  />
                </div>
              </div>
            </AspectRatio>
            
            {promoted && (
              <Badge 
                variant="default" 
                className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-amber-400 text-white border-0 shadow-sm"
              >
                Promoted
              </Badge>
            )}
          </div>
          
          {/* Content section styled to match the attachment */}
          <div className="p-3 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-800 truncate pr-2 text-lg">Busy Bee</h3>
                <button className="bg-white/80 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200 flex-shrink-0 shadow-sm">
                  <Heart size={16} className="text-gray-600" />
                </button>
              </div>
              
              <div className="flex items-center gap-1.5 mb-1.5">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-700 font-medium">{rating || "4.8"}</span>
              </div>
            </div>
            
            <div className="space-y-1.5 mt-1">
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {distance && (
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <MapPin size={14} />
                    <span className="text-xs">{distance}</span>
                  </div>
                )}
                
                {workingHours && (
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Clock size={14} />
                    <span className="text-xs">{workingHours}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }
  
  // For all other studios, use the original card design
  return (
    <Link 
      to={`/studio/${id}`} 
      style={{
        animationDelay: `${200 + index * 100}ms`
      }} 
      className="animate-fade-in block px-[14px]"
    >
      <Card className="overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
        {/* Image section - top */}
        <div className="relative">
          <AspectRatio ratio={16 / 9} className="w-full">
            <div 
              className={cn(
                "h-full w-full bg-cover bg-center",
                image.includes('lovable-uploads') && "flex items-center justify-center bg-white p-4"
              )}
              style={{
                backgroundImage: image.includes('lovable-uploads') ? 'none' : `url(${image})`
              }}
            >
              {image.includes('lovable-uploads') && (
                <img 
                  src={image} 
                  alt={name} 
                  className="max-h-full max-w-full object-contain" 
                />
              )}
            </div>
          </AspectRatio>
          
          {promoted && (
            <Badge 
              variant="default" 
              className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-amber-400 text-white border-0 shadow-sm"
            >
              Promoted
            </Badge>
          )}
        </div>
        
        {/* Content section - bottom */}
        <div className="p-3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-gray-800 truncate pr-2 text-lg">{name}</h3>
              <button className="bg-white/80 p-1.5 rounded-full hover:bg-gray-100 transition-colors duration-200 flex-shrink-0 shadow-sm">
                <Heart size={16} className="text-gray-600" />
              </button>
            </div>
            
            <div className="flex items-center gap-1.5 mb-1.5">
              <Star size={14} className={cn("text-gray-400", rating && "fill-yellow-400 text-yellow-400")} />
              <span className="text-sm text-gray-700 font-medium">{rating || "New"}</span>
            </div>
          </div>
          
          <div className="space-y-1.5 mt-1">
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {distance && (
                <div className="flex items-center gap-1.5 text-gray-500">
                  <MapPin size={14} />
                  <span className="text-xs">{distance}</span>
                </div>
              )}
              
              {workingHours && (
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Clock size={14} />
                  <span className="text-xs">{workingHours}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default StudioCard;
