from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
import requests
from menu.models import MenuItem

class Command(BaseCommand):
    help = 'Add image URLs to menu items'

    def handle(self, *args, **options):
        # Sample food images from public URLs
        image_urls = {
            'Pizza': 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300&h=300&fit=crop',
            'Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop',
            'Pasta': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&h=300&fit=crop',
            'Sandwich': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=300&fit=crop',
        }

        for item_name, image_url in image_urls.items():
            try:
                item = MenuItem.objects.get(name=item_name)
                if not item.image:
                    # Download image from URL
                    response = requests.get(image_url, timeout=5)
                    if response.status_code == 200:
                        # Save image
                        image_name = f'{item_name.lower()}.jpg'
                        item.image.save(image_name, ContentFile(response.content), save=True)
                        self.stdout.write(self.style.SUCCESS(f'✓ Added image for {item_name}'))
                    else:
                        self.stdout.write(self.style.WARNING(f'✗ Failed to download image for {item_name}'))
                else:
                    self.stdout.write(self.style.WARNING(f'✗ {item_name} already has an image'))
            except MenuItem.DoesNotExist:
                self.stdout.write(self.style.ERROR(f'✗ MenuItem "{item_name}" not found'))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'✗ Error processing {item_name}: {str(e)}'))

        self.stdout.write(self.style.SUCCESS('\nImage update complete!'))
